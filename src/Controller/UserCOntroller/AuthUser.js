const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================ Call Utiliy =================================================================
const { hashPassword, comparePassword } = require('../../Midleware/Bcrypt/encrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
const Joi = require('joi');
const cloudinary = require('../../Config/Cloudinary');

//=========================================== END Call Utiliy =================================================================

//======================================================== Auth Register ======================================================

const RegisterUserController = async (req, res) => {
  // return console.log(req.body);
  const skema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8),
  });

  const { error } = skema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    return res.status(400).json({
      message: error.message,
      error: error,
      data: null,
    });
  }
  try {
    const cloudinaryProfilUser = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profil',
    });
    const hashedPassword = await hashPassword(req.body.password);
    let data = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      photo: cloudinaryProfilUser.url,
    };
    const user = await prisma.user.create({
      data: data,
    });
    res.status(201).json({
      message: 'user created successfully',
      error: null,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error,
      data: null,
    });
  }
};
//========================================= END Auth Register ======================================================
//========================================== Login Controller =================================================================
const LoginUserControlller = async (req, res) => {
  const { email, password } = req.body;
  const skema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });

  const { error } = skema.validate({
    email: email,
    password: password,
  });
  if (error) {
    return res.status(400).json({
      message: error.message,
      error: error,
      data: null,
    });
  }
  try {
    // =========================================== Cek Email =================================================================
    const LoginUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!LoginUser) {
      return res.status(404).json({
        message: 'user not found',
        error: null,
        data: null,
      });
    }

    //============================================ END Cek Email ======================================================

    // =========================================== Cek Password ================================================================
    const checkPassword = await comparePassword(password, LoginUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: 'password not match',
        error: null,
        data: null,
      });
    }

    //============================================ END Cek Password ============================================================
    // =========================================== Make Token Login Using JWT ========================================================

    const token = {
      id: LoginUser.id,
      name: LoginUser.name,
      email: LoginUser.email,
      photo: LoginUser.photo,
    };

    const TokenForKogin = jwt.sign(token, secretKey, {
      expiresIn: '1d',
    });

    console.log(TokenForKogin);
    //============================================ END Make Token Login Using JWT ==================================================
    res.status(200).json({
      message: 'Login Successfully',
      error: null,
      data: TokenForKogin,
    });
  } catch (error) {
    console.log(error);
    1;
    return res.status(500).json({
      message: 'something went wrong',
      error: error,
    });
  }
};

//========================================== END Login Controller =================================================================
module.exports = {
  RegisterUserController,
  LoginUserControlller,
};
