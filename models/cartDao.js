const appDataSource = require("./dataSource");

const createCart = async (productId, quantity, userId) => {
  const result = await appDataSource.query(
    `insert into cart (products_id , quantity , users_id) values(?,?,?);`,
    [productId, quantity, userId]
  );

  return result;
};

const existsInCart = async (userId, productId) => {
  const result = await appDataSource.query(
    `
  select COUNT(*) as count from cart where users_id = ? and products_id = ?
  `,
    [userId, productId]
  );
  return result[0].count > 0;
};

const plusQuantity = async (userId, productId, quantity) => {
  const result = await appDataSource.query(
    `
update cart set quantity = quantity + ? where users_id = ? and products_id = ?
`,
    [quantity, userId, productId]
  );
  return result;
};

const selectCart = async (userId) => {
  const result = await appDataSource.query(
    `select c.* , p.name , p.image ,p.price,
    case
    when tc.name = 'creative' then '창의적'
    when tc.name = 'collection' then '수집성'
    else tc.name
    end as category_name,
    c.quantity * p.price as total_price
    from cart c 
    join products p on c.products_id = p.id
    join category tc on p.category_id = tc.id
    where c.users_id = ?`,
    [userId]
  );
  result.forEach((item) => {
    item.total_price = parseInt(item.total_price);
  });

  return result;
};

const updateCart = async (productId, quantityDifference, userId) => {
  const result = await appDataSource.query(
    `update cart set quantity = quantity ${quantityDifference} 1 where products_id = ? and users_id = ?`,
    [productId, userId]
  );
  return result;
};

const getCartQuantity = async (productId, userId) => {
  const result = await appDataSource.query(
    `
  select quantity from cart where products_id = ? and users_id = ?
  `,
    [productId, userId]
  );
  return result;
};

const deleteCart = async (cartId, userId) => {
  const result = await appDataSource.query(
    `delete from cart where id = ? and users_id = ?`,
    [cartId, userId]
  );
  return result;
};

module.exports = {
  createCart,
  existsInCart,
  plusQuantity,
  selectCart,
  getCartQuantity,
  updateCart,
  deleteCart
};
