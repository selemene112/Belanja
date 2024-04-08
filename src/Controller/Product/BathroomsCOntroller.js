const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//========================================== call utility =================================================================
const cloudinary = require('../../Config/Cloudinary');

//========================================== END Call Utiliy =================================================================

// ================================================= Register Bathrom ===================================================
const RegisterBathroomController = async (req, res) => {
  // Request Properti
  let req_data = req.body;
  let reqDataUser = req.user;
  let idProduct = req.params;

  //   return console.log(idProduct);

  try {
    // Upload File photo to cloudinary
    const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profil',
    });

    const data = {
      id_user: reqDataUser.id,
      id_product: idProduct.id,
      photo_bathroom: cloudphotoProfil.url,
    };

    const bathroom = await prisma.bathrooms.create({
      data: data,
    });
    res.status(201).json({
      message: 'bathroom created successfully',
      error: null,
      data: bathroom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};

//============================================ END Register Bathrom =================================================

// ============================================ View All Bathroom on a Product =====================================

const ViewAllBathroomController = async (req, res) => {
  let idProduct = req.params;
  try {
    const bathroom = await prisma.bathrooms.findMany({
      where: {
        id_product: idProduct.id,
      },
    });
    res.status(200).json({
      message: 'bathroom found successfully',
      error: null,
      data: bathroom,
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};

//============================================ END View All Bathroom on a Product =====================================

// =========================================== View Bathrom on a Product using id ===========================================

const ViewBathroomByidController = async (req, res) => {
  let idBathroom = req.params.id;

  try {
    const bathroom = await prisma.bathrooms.findUnique({
      where: {
        id: idBathroom,
      },
    });

    res.status(200).json({
      message: 'Bathroom found successfully',
      error: null,
      data: bathroom,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

//========================================== END View Bathrom on a Product using id ===========================================

//========================================== EDIT Bathroom =================================================================
const EditBathroomController = async (req, res) => {
  const { id } = req.params;

  try {
    const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profil',
    });
    const bathroom1 = await prisma.bathrooms.update({
      where: {
        id: id,
      },
      data: {
        photo_bathroom: cloudphotoProfil.url,
      },
    });
    res.status(201).json({
      message: 'bathroom updated successfully',
      error: null,
      data: bathroom1,
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};
//========================================== END EDIT Bathroom ==============================================================

//=========================================== Delete Foto From Bathroom =====================================================
const DeleteBathroomController = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.bathrooms.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      message: 'bathroom deleted successfully',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};
//=========================================== END Delete Foto From Bathroom =================================================

module.exports = {
  RegisterBathroomController,
  ViewAllBathroomController,
  ViewBathroomByidController,
  EditBathroomController,
  DeleteBathroomController,
};
