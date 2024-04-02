const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================ Call Utiliy =================================================================
const { hashPassword, comparePassword } = require('../../Midleware/Bcrypt/encrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

//=========================================== END Call Utiliy =================================================================

//======================================================== Auth Register ======================================================

const RegisterUserController = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  let data = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    photo: req.body.photo,
  };

  try {
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
      message: 'something went wrong',
      error: error,
    });
  }
};
//========================================= END Auth Register ======================================================
//========================================== Login Controller =================================================================
const LoginUserControlller = async (req, res) => {
  const { email, password } = req.body;
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
