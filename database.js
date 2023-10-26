const { DataSource } = require('typeorm') //typeorm 객체와 관계형데이터베이스를 연결해줌
const dotenv = require("dotenv") // 환경변수를 .env파일에서 로드하기 위해 dotenv 라이브러리를 가져옴
dotenv.config()

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,   
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})


appDataSource.initialize().then(() => {console.log("Data Source has been initialized!")})

module.exports = {appDataSource}