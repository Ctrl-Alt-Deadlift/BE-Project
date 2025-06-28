import { v2 as cloudinary } from "cloudinary"
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

  const image1 = req.files.image1 && req.files.image1[0];
  const image2 = req.files.image2 && req.files.image2[0];
  const image3 = req.files.image3 && req.files.image3[0];
  const image4 = req.files.image4 && req.files.image4[0];

  const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  console.log('Details from request body\n', name, description, price, category, subCategory, sizes, bestseller);
  console.log(images);

  let imagesUrl = await Promise.all(
    images.map(async (item) => {
      let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
      return result.secure_url;
    })
  )
  console.log(`Images uploaded on cloudinary`, imagesUrl);
  const productData = {
    name,
    description,
    category,
    price: Number(price),
    subCategory,
    bestseller: bestseller === "true" ? true : false,
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    date: Date.now()
  }

  // console.log(productData);
  const product = new productModel(productData);
  const connection = await product.save();
  console.log(connection._id);
  res.status(200).json({ message: "Product Added" });

}
// function for list product
const listProducts = async (req, res) => {
  try {
    // '{}' is a empty filtering object in find, we are essentially telling mongoose to retrive all
    // documents from the collection without any fitering conditions.
    // find all list of products from the mongo database.
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });

  }
}

// function for removing a product
const removeProduct = async (req, res) => {

  try {
    await productModel.findByIdAndDelete(req.body.id);
    const instance = await productModel.findById(req.body.id);
    if (!instance)
      res.status(200).json({ success: true, message: "Product removed successfully!" });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });

  }
}

// For getting single product information
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, message: "Product fetched successfully", product });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });

  }
}

export { listProducts, addProduct, removeProduct, singleProduct };