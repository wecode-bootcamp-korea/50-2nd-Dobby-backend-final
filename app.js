//NODE.JS모듈 가져오기
const http = require('http'); // http 서버생성
const express = require('express'); // express 프레임워크 사용
const cors = require('cors'); // 
const dotenv = require('dotenv'); //
const { appDataSource } = require('./database'); //
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const port = process.env.PORT;
//--------------------------------

const viewProduct = async (req, res)=>{
    try {
        const productId = req.params.product_id
        const data = await appDataSource.query(`
        SELECT id, name, price, image, content
        FROM
        products
        WHERE ID=${productId}
        `)
        const review = await appDataSource.query(`
        SELECT C.id, C.content, C.score, C.created_at, U.nickname 
        FROM products P 
        LEFT JOIN comments C ON P.ID = C.products_id 
        LEFT JOIN users U ON C.users_id = U.ID 
        WHERE P.ID = ${productId}
        `)
        console.log('data=',data)
        console.log('review=',review)
        if (data.length === 0){return res.status(404).json({message : 'PRODUCT_NOT_FOUND'})}
        if (review[0].ID === null ){return res.status(404).json({data: data})}
        return res.status(200).json({data: data ,review: review})
    } catch (err) {
        console.error(err);
    }
}

app.get('/products/:product_id', viewProduct)


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


