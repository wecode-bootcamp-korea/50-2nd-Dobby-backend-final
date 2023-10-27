const appDataSource = require("../utils/db");

const createCart = async (productId, quantity, userId, statusId) => {
  const result = await appDataSource.query(
    `insert into cart (product_id , quantity , user_id , cart_status_id) values(?,?,?,?);`,
    [productId, quantity, userId, statusId, statusId]
  );

  return result;
};

const selectCart = async (userId) => {
  const result = await appDataSource.query(
    `select c.* , p.name , p.image ,p.price, tc.name as top_category_name, c.quantity * p.price as total_price from cart c join products p on c.product_id = p.id join top_category tc on p.top_category_id = tc.id where c.user_id = ?`,
    [userId]
  );
  return result;
};

const checkBox = async (userId, cartId, statusId) => {
  const result = await appDataSource.query(
    `
  update cart set cart_status_id = ? where user_id = ? and id =?
  `,
    [statusId, userId, cartId]
  );

  return result;
};


const updateCart = async (productId, quantityDifference) => {
  const result = await appDataSource.query(
    `update cart set quantity = quantity ${
      quantityDifference === "+" ? "+" : "-"
    } 1 where product_id = ? and user_id = ?`,
    [productId]
  );
  return result;
};

const deleteCart = async (productId) => {
  const result = await appDataSource.query(
    `delete from cart where product_id = ? and user_id = ?`,
    [productId]
  );
  return result;
};

module.exports = {
  createCart,
  selectCart,
  checkBox,
  updateCart,
  deleteCart,
};
