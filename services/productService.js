const { findProduct } = require('../models/productDao')

const viewProduct = async(id) =>{
    try {
        const product = await findProduct(id);
        return product;
       
    
       
    } catch(err) {
        console.error(err);
        return res.status(err.statusCode || 500).json({message:err.message});
    } 
} 



module.exports = { viewProduct }