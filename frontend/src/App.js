import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/form.js";
import Grid from "./components/grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; 
`;

const Title = styled.h2``;

function App() {
  const [pages, setPages] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getPages = async () => {
    try{
      const res = await axios.get("http://localhost:8800");
      setPages(res.data.sort((a, b) => (a.dominio > b.dominio ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getPages();
  }, [setPages]);

  return (
    <>
      <Container>
        <Title>Tags páginas</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getPages={getPages}/>
        <Grid pages={pages} setPages={setPages} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <GlobalStyle/>
    </>
  );
}

export default App;
