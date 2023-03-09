const fs = require("fs");
const {
	v4: uuidv4
} = require('uuid');

let path = "./products.json";


async function getProducts() {
	try {
		if (fs.existsSync(path)) {

			const data = await fs.promises.readFile(path, "utf-8")

			const products = JSON.parse(data);
			return products;
		} else {
			console.log("El JSON esta vacio")
			const products = []
			return products;
		}
	} catch (error) {
		error;
	}

}

async function getProductsByIdJson(productId) {
	try {
		const products = await getProducts();

		const productFilt = products.filter(product => product.id == productId)

		if (productFilt.length == 0) {
			return `Not found`
		} else {
			return productFilt
		}
	} catch (error) {
		error;
	}
}


async function deleteProductJson(productId) {
	try {
		const products = await getProducts();

		const productFilt = products.filter(product => product.id == productId)

		if (productFilt.length == 0) {
			return `Not found`;
		} else {
			const productsFiltered = products.filter(product => product.id !== productId);

			const nuevoProducts = await fs.promises.writeFile(path, JSON.stringify(productsFiltered, null, "\t"));

			return `Deleted product with id: ${productId}`;

		}
	} catch (error) {
		error;
	}
}

async function updateProductJson(productId, obj) {
	try {
		const {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			status,
			category
		} = obj;
		//console.log(title, price, code)
		const products = await getProducts();
		const productById = products.find(product => product.id == productId);


		if (!productById) {
			return `We could not find a product with this ID`;
		} else {

			const newProducts = products.map(product => {
				if (product.id == productId) {

					product.title = title;
					product.description = description;
					product.price = Number(price);
					product.thumbnail = thumbnail;
					product.code = code;
					product.stock = Number(stock);
					product.status = status;
					product.category = category;
				}
				return product
			})


			await fs.promises.writeFile(path, JSON.stringify(newProducts, null, "\t"));
			return `Modify product with id: ${productId}`;
		}
	} catch (error) {
		error;
	}
}

async function addProductJson(obj) {
	try {
		const {
			title,
			description,
			price,
			thumbnail,
			code,
			stock,
			status,
			category
		} = obj;
		const products = await getProducts();



		const product = {
			id: uuidv4(),
			title,
			description,
			price: Number(price),
			thumbnail,
			code,
			stock: Number(stock),
			status: Boolean(status),
			category
		}

		const productFilt = products.filter(product => product.code == code)

		if (productFilt.length == 0) {


			products.push(product)

			await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
			console.log(`Added product with id: ${product.id}`);
			return product;
		} else {

			const notCreated = "Error. The code must be unique. Please try again";
			return notCreated;
		}
	} catch (error) {
		error;
	}
}


module.exports = {
	getProducts,
	getProductsByIdJson,
	deleteProductJson,
	updateProductJson,
	addProductJson
}