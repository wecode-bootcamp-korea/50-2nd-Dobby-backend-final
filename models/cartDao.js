<<<<<<< HEAD
const appDataSource = require("./dataSource")

const createCart = async (productId, quantity, userId) => {
  const result = await appDataSource.query(
    `INSERT INTO
    cart (products_id , quantity , users_id)
    VAlUES
    (?,?,?);`,
    [productId, quantity, userId]
  );

  return result;
};

const existsInCart = async (userId, productId) => {
  const result = await appDataSource.query(
    `
  SELECT
  COUNT(*) as count 
  FROM cart 
  WHERE users_id = ?
  AND products_id = ?
  `,
    [userId, productId]
  );
  return result[0].count > 0;
};

const plusQuantity = async (userId, productId, quantity) => {
  const result = await appDataSource.query(
    `
  UPDATE cart 
  SET quantity = quantity + ? 
  WHERE users_id = ? 
  AND products_id = ?
`,
    [quantity, userId, productId]
  );
  return result;
};

const selectCart = async (userId) => {
  const result = await appDataSource.query(
    `SELECT c.* , p.name , p.image ,p.price,
    CASE
    WHEN tc.name = 'creative' THEN '창의적'
    WHEN tc.name = 'collection' THEN '수집성'
    ELSE tc.name
    END as category_name,
    c.quantity * p.price as total_price
    FROM cart c 
    JOIN products p ON c.products_id = p.id
    JOIN category tc ON p.category_id = tc.id
    WHERE c.users_id = ?`,
    [userId]
  );
  result.forEach((item) => {
    item.total_price = parseInt(item.total_price);
  });

  return result;
};

const updateCart = async (productId, quantityDifference, userId) => {
  const result = await appDataSource.query(
    `UPDATE cart 
    SET quantity = quantity ${quantityDifference} 1 
    WHERE products_id = ? 
    AND users_id = ?`,
    [productId, userId]
  );
  return result;
};

const getCartQuantity = async (productId, userId) => {
  const result = await appDataSource.query(
    `
  SELECT quantity 
  FROM cart 
  WHERE products_id = ? 
  AND users_id = ?
  `,
    [productId, userId]
  );
  return result;
};

const validateUserId = async (cartId) => {
  const result = await appDataSource.query(
    `
  SELECT users_id
  FROM cart 
  WHERE id =?
  `,
    [cartId]
  );
  return result[0].users_id;
};

const deleteCart = async (cartId) => {
  const result = await appDataSource.query(
    `DELETE 
    FROM cart 
    WHERE id = ?`,
    [cartId]
  );
  return result;
};

const updateCartStatus = async (cartId, status) => { // 카트를 결제 대기 상태(pending)로 바꿔 줍니다
  return await appDataSource.query(
    `
    UPDATE cart 
    SET 
    status = "${status}" 
    WHERE 
    id = '${cartId}' 
    `
  )
}

const findCartAndProduct = async (cartId) => {
  const productInCartData = await appDataSource.query(
    `
    SELECT 
    cart.id, 
    cart.products_id, 
    cart.quantity, 
    products.name as products_name, 
    products.price as products_price, 
    products.image as products_image, 
    category.name as category_name
    FROM 
    cart 
    JOIN 
    products 
    ON 
    cart.products_id = products.id 
    JOIN
    category
    ON
    products.category_id = category.id
    WHERE
    cart.id = ${cartId}
    `
  );
  const productInfoObj = productInCartData[0];
  productInfoObj["total_price"] = parseInt(productInfoObj["products_price"]) * parseInt(productInfoObj["quantity"]); // integer * integer
  return await productInCartData;
}

const findCart = async (userId) => {
  return await appDataSource.query(
    `
    SELECT 
    id 
    FROM 
    cart 
    WHERE 
    cart.users_id = '${userId}' AND status = "PENDING"
    `
  );
}

module.exports = {
  createCart,
  existsInCart,
  plusQuantity,
  selectCart,
  getCartQuantity,
  validateUserId,
  updateCart,
  deleteCart,
  findCartAndProduct,
  findCart,
  updateCartStatus
}
=======
const appDataSource = require("./dataSource");

const createCart = async (productId, quantity, userId) => {
  const result = await appDataSource.query(
    `INSERT INTO
    cart (products_id , quantity , users_id)
    VAlUES
    (?,?,?);`,
    [productId, quantity, userId]
  );

  return result;
};

const existsInCart = async (userId, productId) => {
  const result = await appDataSource.query(
    `
  SELECT
  COUNT(*) as count 
  FROM cart 
  WHERE users_id = ?
  AND products_id = ?
  `,
    [userId, productId]
  );
  return result[0].count > 0;
};

const plusQuantity = async (userId, productId, quantity) => {
  const result = await appDataSource.query(
    `
  UPDATE cart 
  SET quantity = quantity + ? 
  WHERE users_id = ? 
  AND products_id = ?
`,
    [quantity, userId, productId]
  );
  return result;
};

const selectCart = async (userId) => {
  const result = await appDataSource.query(
    `SELECT c.* , p.name , p.image ,p.price,
    CASE
    WHEN tc.name = 'creative' THEN '창의적'
    WHEN tc.name = 'collection' THEN '수집성'
    ELSE tc.name
    END as category_name,
    c.quantity * p.price as total_price
    FROM cart c 
    JOIN products p ON c.products_id = p.id
    JOIN category tc ON p.category_id = tc.id
    WHERE c.users_id = ?`,
    [userId]
  );
  result.forEach((item) => {
    item.total_price = parseInt(item.total_price);
  });

  return result;
};

const updateCart = async (productId, quantityDifference, userId) => {
  const result = await appDataSource.query(
    `UPDATE cart 
    SET quantity = quantity ${quantityDifference} 1 
    WHERE products_id = ? 
    AND users_id = ?`,
    [productId, userId]
  );
  return result;
};

const getCartQuantity = async (productId, userId) => {
  const result = await appDataSource.query(
    `
  SELECT quantity 
  FROM cart 
  WHERE products_id = ? 
  AND users_id = ?
  `,
    [productId, userId]
  );
  return result;
};

const validateUserId = async (cartId) => {
  const result = await appDataSource.query(
    `
  SELECT users_id
  FROM cart 
  WHERE id =?
  `,
    [cartId]
  );
  return result[0].users_id;
};

const deleteCart = async (cartId) => {
  const result = await appDataSource.query(
    `DELETE 
    FROM cart 
    WHERE id = ?`,
    [cartId]
  );
  return result;
};

module.exports = {
  createCart,
  existsInCart,
  plusQuantity,
  selectCart,
  getCartQuantity,
  validateUserId,
  updateCart,
  deleteCart,
};
>>>>>>> main
