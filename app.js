const http = require('http')
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes");
// const qs = require("qs")
const {DataSource} = require("typeorm");
const dotenv = require('dotenv')
dotenv.config()

const appDataSource = new DataSource(
    {
        type: "mysql",
        host: process.env.TYPEORM_HOST,
        port: '3306',
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE
    }
)

const app = express()

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);



const server = http.createServer(app);
const PORT = 8000;
const start = async () => {
    try {
        appDataSource.initialize().then(
            () =>
        server.listen(PORT, () => console.log('Server is listening on 8000')));
    } catch (err) {
        console.error(err)
    }
}


start()
