const express = require("express");
const app = express();

const routerProducts = require("./routes/products.router");
const routerCarts = require("./routes/carts.router");

app.use(express.json());
app.use(express.static("public"));

//Routers
app.use("/products", routerProducts);
app.use("/carts", routerCarts);


//Reglas
app.get("/ping", (req, res) => {
  res.send("pong");
});



app.listen(8080, () => {
  console.log("Aplicación funcionando en el puerto 8080");
});
