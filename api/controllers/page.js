import { db } from "../db.js";
import axios from "axios";
import cheerio  from "cheerio";

export const getPages = (_, res) => {
    const q = "SELECT * FROM paginas";

    db.query(q, (err, data) => {
        if(err) return res.json(err);

        return res.status(200).json(data);
    });
}; 

async function countTags(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const tagCounts = {};
      $('*').each((index, element) => {
        const tagName = element.name.toLowerCase();
        if (tagCounts[tagName]) {
          tagCounts[tagName]++;
        } else {
          tagCounts[tagName] = 1;
        }
      });
      return tagCounts;
    } catch (error) {
      throw new Error('ERRO: ' + error.message);
    }
  };

export const addPage = (req, res) => {

    const q = "INSERT INTO paginas(`dominio`, `tag`, `quantidade`) VALUES(?)";
        
    const url = req.body.dominio; // Substitua pela URL do site que deseja analisar
    countTags(url)
      .then(tagCounts => {
        Object.entries(tagCounts).forEach(([chave, valor]) => {
            console.log(chave, valor);

            const values = [
                req.body.dominio,
                chave,
                valor,
            ];
        
            db.query(q, [values]);

          });
      }) .catch(error => {
        console.error(error.message);
      });
    
      return res.status(200).json("Página cadastrada com sucesso.");
};

export const updatePage = (req, res) => {
    const q = 
    "UPDATE paginas SET `dominio` = ?, `tag` = ?, `quantidade` = ? WHERE `id` = ?";

    const values = [
        req.body.dominio,
        req.body.tag,
        req.body.quantidade,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);
        return res.status(200).json("Tag atualizada com sucesso.");

    }); 
};

export const deletePage = (req, res) => {
    const q = "DELETE FROM paginas WHERE `id` = ?";


    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);
        return res.status(200).json("Tag deletada com sucesso.");

    }); 
};