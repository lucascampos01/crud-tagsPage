 import mysql from "mysql"

 export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DEv**lucas001",
    database:"crud_tags"
 });
