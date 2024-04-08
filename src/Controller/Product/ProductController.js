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
  const { pageNumber, pageSize, searchCriteria } = req.query; // Get Query Parameter
  let page = parseInt(req.query.pageSize) || 1; // make page Size from string to integer
  try {
    const skip = (pageNumber - 1) * pageSize;
    let where = {}; // Save Object for save momery filter

    // For Filter Search
    if (searchCriteria) {
      where = {
        OR: [{ title: { contains: searchCriteria } }, { name_user: { contains: searchCriteria } }],
      };
    }

    //+++++++++++++++++++++++++++++++++++++++++++++ Logic Pagnation +++++++++++++++++++++++++++++++++++++++++
    const products = await prisma.product.findMany({
      skip,
      take: page,
      orderBy: {
        createdAt: 'desc',
      },
      where,
      include: {
        Bathrooms: true,
      },
    });
    //++++++++++++++++++++++++++++++++++++++++++ End Logic Pagnation +++++++++++++++++++++++++++++++++++++++++

    // For make total data from search product
    const totalProducts = await prisma.product.count({
      where,
    });

    //++++++++++++++++++++++++++++++++++ This Logic For View Pagnation +++++++++++++++++++++++++++++++++++
    let totalData = totalProducts;
    let totalPage = Math.ceil(totalData / pageSize);
    let nextPage = pageNumber < totalPage ? +pageNumber + 1 : null;
    let prevPage = pageNumber > 1 ? pageNumber - 1 : null;
    let lastPage = totalPage;

    //++++++++++++++++++++++++++++++++++ End Logic for View Pagnation +++++++++++++++++++++++++++++++++++++++++
    // Respon API Succes make API
    return res.status(200).json({
      message: 'success',
      error: null,
      data: {
        products,
        totalData: totalData,
        totalPage: totalPage,
        currentPage: +pageNumber,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
      },
    });
  } catch (error) {
    console.log(error);
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
