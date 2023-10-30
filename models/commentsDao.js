const{appDataSource} = require('./dataSource');

const findReview = async (id) => {
    try{
        const reviews = appDataSource.query(`
        SELECT 
        C.id, 
        C.content, 
        C.score,
        date_format(C.created_at,'%y-%m-%d') as created_date, 
        U.nickname 
        FROM products P 
        LEFT JOIN comments C ON P.ID = C.products_id 
        LEFT JOIN users U ON C.users_id = U.ID 
        WHERE P.ID = ${id}
        `)
        return reviews
    } catch (err) {
        console.error(err)
    }
}

module.exports = { findReview }