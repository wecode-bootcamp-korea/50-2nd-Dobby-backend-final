const appDataSource = require("./dataSource");

const getAllProducts = async (req, res) => {
  const result = await appDataSource.query(
    `select p.id , p.image , p.name , p.price , avg(c.score) as score , count(c.id) as commentCount from products p join comments c on p.id = c.products_id group by p.id , p.image , p.name , p.price`
  );
  return result;
};

module.exports = {
  getAllProducts,
};
