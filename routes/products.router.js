const express = require("express");
const router = express.Router();

var PRODUCTS = [];

// Listar todos los productos
router.get("/", (req, res) => {
  const { limit } = req.query;
  let productsToReturn = PRODUCTS;

  if (limit) {
    const limitNumber = parseInt(limit, 10);
    productsToReturn = PRODUCTS.slice(0, limitNumber);
  }

  res.status(200).send(productsToReturn);
});

// Obtener un producto por id
router.get("/:pid", (req, res) => {
  const productId = req.params.pid;
  const product = PRODUCTS.find((p) => p.id == productId);

  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  const body = req.body;
  const newProduct = {
    id: generateProductId(),
    title: body.title,
    description: body.description,
    code: body.code,
    price: body.price,
    status: body.status || true,
    stock: body.stock,
    category: body.category,
  };

  PRODUCTS.push(newProduct);
  res.status(201).send({ status: 201, product: newProduct });
});

// Actualizar un producto por id
router.put("/:pid", (req, res) => {
  const productId = req.params.pid;
  const updatedProductIndex = PRODUCTS.findIndex((p) => p.id === productId);

  if (updatedProductIndex !== -1) {
    const updatedProduct = {
      ...PRODUCTS[updatedProductIndex],
      ...req.body,
      id: productId, // Esto hace que el ID no se actualice
    };

    PRODUCTS[updatedProductIndex] = updatedProduct;
    res.status(200).send({ status: 200, product: updatedProduct });
  } else {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

// Eliminar un producto por id
router.delete("/:pid", (req, res) => {
  const productId = req.params.pid;
  const productIndex = PRODUCTS.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    PRODUCTS.splice(productIndex, 1);
    res.status(200).send({ status: 200, message: "Producto eliminado" });
  } else {
    res.status(404).send({ error: "Producto no encontrado" });
  }
});

// Función para generar un ID único para cada producto
function generateProductId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = router;