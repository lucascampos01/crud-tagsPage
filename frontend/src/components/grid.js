import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border radius: 5px;
    max-width: 9 00px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Tbody = styled.tbody``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`;

export const Td = styled.td`
    width: ${(props) => (props.width ? props.width : "auto")};
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    padding-top: 15px;
`;
const Grid = ({ pages, setPages, setOnEdit }) => {
    const handleDelete = async(id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = pages.filter((page) => page.id !== id);

                setPages(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));
        
        setOnEdit(null);
    }

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Url</Th>
                    <Th>Tag</Th>
                    <Th>Quantidade</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {pages.map((item, i) => (
                    <Tr key={i}>
                        <Td width="40%">{item.dominio}</Td>
                        <Td width="10%">{item.tag}</Td>
                        <Td width="10%">{item.quantidade}</Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)}/>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid