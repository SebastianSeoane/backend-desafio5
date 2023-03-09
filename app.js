const express = require('express');
const handlebars = require("express-handlebars")
const getAllProducts = require("./controllers/products.controllers/getAllProducts")
const 
  {addProductJson, deleteProductJson}
= require("./controllers/products.controllers/getProductsJson");
const {Server} = require("socket.io")

const app = express()
const port = 8080
const productos = [];
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")
app.use(express.static(__dirname+"/public"))



app.get('/', async (req, res) => {
    const products = await getAllProducts();
res.render('home', {products,style: "home.css"})

}
  //res.render('home', {style: "home.css"})
)

app.get('/realtimeproducts',async (req, res) => {
  const products = await getAllProducts();
    res.render('realtimeproducts', {products,style: "realtimeproducts.css"})
  })

const HTTTPServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const io = new Server(HTTTPServer)

io.on("connection", (socket) => {
    console.log("server levantado con socket")

    socket.on('addProduct', async function(product) {     
      const result = await addProductJson(product);
      console.log( result);

      io.emit('productAdded', result);
    });
     
    
   
    socket.on("deleteProduct", async function(product) {  
      const {productId} = product
      const result = await deleteProductJson(productId);
      console.log('Result:', result);

      io.emit('productDeleted', productId);
  });
    });

    
