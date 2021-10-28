import Product from '../models/Product'

export const getProducts = async(req, res) => {
    const products = await Product.find({});
    res.json(products);
}
export const createProduct = async(req, res) => {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product({ name, category, price, imgUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
}
export const getProductById = async(req, res) => {
    // const { id } = req.params;
    // console.log(id);
    try {
        const productFound = await Product.findById(req.params.productId);
        res.json(productFound);
    } catch (err) {
        console.log(err);
        res.json(err);
    }

}
export const deleteProductById = async(req, res) => {
    const productDeleted = await Product.findByIdAndDelete(req.params.productId);
    console.log(productDeleted);
    res.status(204).json(productDeleted);
}


export const updateProductById = async(req, res) => {
    const { name, category, price, imgUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { name, category, price, imgUrl }, { new: true });
    res.json(updatedProduct);
}