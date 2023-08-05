import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
 `;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
 `;

const Label = styled.label`
    color: gray;
    padding: 5px 0;
`;

const Input = styled.input`
    width: 200px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getPages, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const page = ref.current;

            page.dominio.value = onEdit.dominio;
            page.tag.value = onEdit.tag;
            page.quantidade.value = onEdit.quantidade;
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const page = ref.current;

        if(onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    dominio: page.dominio.value,
                    tag: page.tag.value,
                    quantidade: page.quantidade.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800/", {
                    dominio: page.dominio.value,
                    tag: page.tag.value,
                    quantidade: page.quantidade.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        
        }
        page.dominio.value = "";
        page.tag.value = "";
        page.quantidade.value = ""; 

        setOnEdit(null);
        getPages();
    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Url da página:</Label>
                <Input name="dominio" />
            </InputArea>
            <InputArea>
                <Label>Tag:</Label>
                <Input name="tag" />
            </InputArea>
            <InputArea>
                <Label>Quantidade:</Label>
                <Input name="quantidade" />
            </InputArea>
        
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
};

export default Form;