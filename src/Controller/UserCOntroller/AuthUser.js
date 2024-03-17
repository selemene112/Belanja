const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ============================================ Call Utiliy =================================================================
const { hashPassword } = require('../../Midleware/Bcrypt/encrypt');

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

module.exports = {
  RegisterUserController,
};
