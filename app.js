const http = require('http');
const express = require('express');
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const morgan = require("morgan")
dotenv.config();

const routes= require('./routes');

const app = express();
app.use(morgan("combined"))
app.use(cors());
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const port = process.env.PORT;

//서버 구동 함수
const start = async () => {
    try {
        server.listen(port, ()=> {
            console.log(`server is listening on ${port}`);
        })
    } catch (err) {
        console.error(err);
    }
}

start();


