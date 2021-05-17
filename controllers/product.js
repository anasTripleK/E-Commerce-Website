const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }
};

exports.changeAvailability = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.availability = !product.availability;
    await product.save();
    res.json({ msg: 'Availability changed' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      company,
      price,
      category,
      availability,
      shortDescription,
      completeDescription,
      color,
    } = req.body;

    const productProps = {
      title,
      company,
      price,
      category,
      availability,
      shortDescription,
      completeDescription,
      color,
      specs: {
        ...req.body.specs,
      },
    };

    productProps.productImage = req.file.path;

    const product = new Product(productProps);
    await product.save();
    res.json({ msg: 'Product added' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal server error' });
  }
};
