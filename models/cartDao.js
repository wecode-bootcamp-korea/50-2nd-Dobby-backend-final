// HTTP GET 요청에 응답한 HTTP RESPONSE를 위한 함수
// REQUEST.BODY에 내용을 담는다.
const { appDataSource } = require("../entity/utils")


const findCartAndProduct = async (cartId) => {
        try {
                const productInCartData = await appDataSource.query(
                    `
                    SELECT cart.id, cart.products_id, cart.quantity, products.name as products_name, products.price as products_price, products.image as products_image
                    FROM 
                    cart 
                    JOIN 
                    products 
                    ON 
                    products.id = cart.products_id
                    WHERE
                    cart.id = ${cartId}
                    `
                );
                const productInfoObj = productInCartData[0];
                productInfoObj["total_price"] = parseInt(productInfoObj["products_price"]) * parseInt(productInfoObj["quantity"]); // integer * integer
                console.log(productInfoObj)
                return await productInCartData;                                       // [{'':'', "":"", "":"", ..}]
        } catch (e) {
                console.error(e)
        }
}

const findCart = async (userId) => {
        try {
                return await appDataSource.query(
                    `
            SELECT 
            id 
            FROM 
            cart 
            WHERE 
            cart.users_id = '${userId}' AND cart_status_id = 1 AND status = "PENDING"
                    `
                );
        } catch (e) {
                console.error(e);
        }
}

// 주문 취소 button => cart.status => NONE. PATCH 204
const revertCartStatus = async (userId) => {
        try {
                return await appDataSource.query(
                    `
                    UPDATE cart 
                    SET 
                    status = "NONE" 
                    WHERE 
                    users_id = '${userId}' AND status = "PENDING"
                    `
                );
        } catch (e) {
                console.error(e);
        }
}



const makeCartStatusDone = async (userId) => {
        try {
                return await appDataSource.query(
                    `
                    UPDATE cart 
                    SET 
                    status = "DONE" 
                    WHERE 
                    users_id = '${userId}' AND status = "PENDING"
                    `
                );
        } catch(e) {
                console.error(e);
        }
}


// 추가 구현 사항
// const cancelOrder = async (userId, orderRandom) => {
//         try {
//                 return await appDataSource.query(
//                     `
//                     UPDATE products, order
//                     JOIN
//                     products ON products.id = order.products_id
//                     SET products.sales = products.sales - order.quantity
//                     WHERE
//                     order.users_id = '${userId}' AND order.order_random = '${orderRandom}'
//                     `
//                 )
//         } catch (e) {
//                 console.error(e)
//         }
// }


module.exports = { findCartAndProduct, findCart, revertCartStatus, makeCartStatusDone }


