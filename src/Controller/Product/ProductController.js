const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('../../Config/Cloudinary');

//=========================================== Call Utiliy =================================================================

const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
//=========================================== END Call Utiliy =================================================================
//=========================================== Register Product ========================================================================
const RegisterProductController = async (req, res) => {
  // Request Properti
  let req_data = req.body;
  let reqDataUser = req.user;

  try {
    // Upload File photo to cloudinary
    const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profil',
    });

    // Convert price from string to number
    let priceConver = parseInt(req_data.price);

    // Create data Product
    const data = {
      title: req_data.title,
      id_user: reqDataUser.id,
      name_user: reqDataUser.name,
      contact: req_data.contact,
      andress: req_data.andress,
      country: req_data.country,
      city: req_data.city,
      subdistrict: req_data.subdistrict,
      postalcode: req_data.postalcode,
      map: req_data.map,
      price: priceConver,
      photo: cloudphotoProfil.url,
    };

    // Create New Product use Prisma
    const product = await prisma.product.create({
      data: data,
    });

    // Respon API
    res.status(201).json({
      message: 'product created successfully',
      error: null,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};

//=========================================== END Register Product ========================================================================

//============================================ Pagnation List Product =================================================================
const PagnationListProductController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const totalData = await prisma.product.count();
    const totalPage = Math.ceil(totalData / limit);
    const currentPage = page;
    const nextPage = currentPage < totalPage ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const lastPage = totalPage;
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};
//============================================== END Pagnation List Product =================================================================
module.exports = {
  RegisterProductController,
  PagnationListProductController,
};
