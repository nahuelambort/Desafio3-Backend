import { promises as fs, constants } from "fs";

export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        try {
            let respuesta = await fs.readFile(this.patch, "utf-8");
            return JSON.parse(respuesta);
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        console.log(respuesta2);
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find((product) => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async ({ id, ...producto }) => {
        let productOld = await this.readProducts();
        const productoExistente = productOld.find((p) => p.id === id);
        if (!productoExistente) {
            console.log("Producto no encontrado");
            return;
        }
    
        const productoActualizado = { ...productoExistente, ...producto };
        const productosActualizados = productOld.map((p) => (p.id === id ? productoActualizado : p));
        await fs.writeFile(this.patch, JSON.stringify(productosActualizados));
        console.log("Producto modificado");
    };

    async init() {
        try {
            await fs.access(this.patch, constants.F_OK);
        } catch (error) {
            await fs.writeFile(this.patch, "[]");
        }
    }
}

//const productos = new ProductManager();

const addAndFetchProducts = async () => {
    await productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc121", 5);
    await productos.addProduct("Titulo2", "Description2", 2000, "Imagen2", "abc122", 6);
    await productos.addProduct("Titulo3", "Description3", 3000, "Imagen3", "abc123", 7);
    await productos.addProduct("Titulo4", "Description4", 4000, "Imagen4", "abc124", 8);
    await productos.addProduct("Titulo5", "Description5", 4000, "Imagen5", "abc125", 7);
    await productos.addProduct("Titulo6", "Description6", 4000, "Imagen6", "abc126", 6);
    await productos.addProduct("Titulo7", "Description7", 4000, "Imagen7", "abc127", 7);
    await productos.addProduct("Titulo8", "Description8", 4000, "Imagen8", "abc128", 8);
    await productos.addProduct("Titulo9", "Description9", 4000, "Imagen9", "abc129", 7);
    await productos.addProduct("Titulo10", "Description10", 4000, "Imagen10", "abc130", 6);
};


// Inicializa y luego agrega los productos al .txt
async function initialize() {
    await productos.init();
    await addAndFetchProducts();
}
//initialize();

//Tomar productos y los muestra en consola

//productos.getProducts()


//Tomar un producto por su ID

//productos.getProductsById(2)


//Eliminar un producto por su ID

//productos.deleteProductsById(1)


//Actualizar un producto

/*
productos.updateProducts({    
    title: 'Titulo2',
    description: 'Description2',
    price: 8888,
    imagen: 'Imagen2',
    code: 'abc124',
    stock: 5,
    id: 2
});
*/