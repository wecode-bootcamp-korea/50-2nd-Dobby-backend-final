// HTTP GET 요청에 응답한 HTTP RESPONSE를 위한 함수
// REQUEST.BODY에 내용을 담는다.
const { appDataSource } = require("../entity/utils")



const addProductSales = async (userId) => {  // products table에 cart table을 INNER JOIN 시켜 UPDATE (PATCH RESPONSE)
    try {
            return await appDataSource.query(
            `
        UPDATE 
        products
        LEFT JOIN 
        cart 
        ON products.id = cart.products_id
        SET products.sales = products.sales + cart.quantity
        WHERE 
        cart.users_id = ${userId} 
        AND 
        cart.status = "PENDING"
                    `
            )
    } catch(e) {
        console.error(e);
    }
}

module.exports = { addProductSales }
