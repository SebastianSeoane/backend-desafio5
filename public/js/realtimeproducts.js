const socket = io();
  const addProductBtn = document.getElementById('addProductBtn');
  const deleteBtn = document.querySelector("#deleteBtn");
  
 
 
  addProductBtn.addEventListener('click', function(e) {
    
    e.preventDefault();
    
    const product = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      thumbnail: document.getElementById('thumbnail').value,
      code: document.getElementById('code').value,
      stock: document.getElementById('stock').value,
      status: document.getElementById('status').value,
      category: document.getElementById('category').value
    };
    
    socket.emit('addProduct', product);
    title.value = '';
    description.value = '';
    price.value = '';
    thumbnail.value = '';
    code.value = '';
    stock.value = '';
    status.value = '';
    category.value = '';
  });

  socket.on('productAdded', (product) => {
    
    console.log("el producto que me llega es",product)

    const data = {
        title: product.title,
        price: product.price,
        id: product.id
      };
      const productList = document.getElementById('product-list');
  const productTemplate = `<li id="{{id}}">- El producto <strong>{{title}}</strong> tiene un valor de <strong>{{price}}</strong> y tiene un ID:<strong>{{id}}</strong> </li>`;
const template = Handlebars.compile(productTemplate);
const productHTML = template(data);
productList.innerHTML += productHTML;

   /*  const ul = document.getElementById("product-list")
    console.log("la ul antes:",ul)
    const liAdded = `<li id="${product.id}">- El producto <strong>${product.title}</strong> tiene un valor de <strong>${product.price}</strong> y su ID es: <strong>${product.id}</strong> </li>`
    console.log("la li es:",liAdded)
    ul.append(liAdded)
    console.log("la ul luego:",ul) */
    
   
  })

  deleteBtn.addEventListener("click", function(e) {
    
    e.preventDefault();
    let productId = document.getElementById("productId");
    console.log("antes",productId.value)
    socket.emit("deleteProduct", { productId : productId.value});
    productId.value = '';
    console.log("ahora",productId.value)
  });

  socket.on('productDeleted', (productId) => {
    const liWithProduct = document.getElementById(productId);
    liWithProduct.remove()
  });