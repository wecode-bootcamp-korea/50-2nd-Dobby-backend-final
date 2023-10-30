const {DataSource} = require("typeorm");
const dotenv = require('dotenv')
dotenv.config()
// const qs = require("query-string");


const throwErr = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
} // Error Handling


// url request query parsing
// const getParam = function (url, name) {
//     return qs.parseUrl(url).query[name];
// };

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

const initializedWell = async () => {
    try {
        await appDataSource.initialize().then(
            () => {
                console.log("Initialized! Your DB is initialized via typeorm DataSource")
            }
        )
    }
    catch (err) {
        console.error(err)
    }
}


initializedWell()

module.exports = { appDataSource, throwErr }