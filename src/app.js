import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended : true }));

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

app.get("/products/:pid", async (req,res) => {
    let pid = parseInt(req.params.pid);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === pid);
    res.send(productById)
});

const PORT = 8080;
const server = app.listen(PORT, () =>{
    console.log(`Express por Local Host ${server.address().port}`)
});
server.on("error", (error) => console.log(`Error del servidor ${error}`))