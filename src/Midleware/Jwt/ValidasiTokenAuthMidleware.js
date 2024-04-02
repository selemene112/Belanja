const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

// ===================================================== Validasi Token ==============================================
const ValidasiToken = async (req, res, next) => {
  // ================================================= Cek Token ====================================================
  const generateToken = req.header('Authorization');
  if (!generateToken) {
    return res.status(401).json({
      success: false,
      message: 'Input Token First',
    });
  }

  // ================================================= END Cek Token ====================================================

  try {
    const decoded = jwt.verify(generateToken, secretKey);
    req.user = decoded;
    next();
  } catch (error) {}
};

// ===================================================== END Validasi Token ==============================================

module.exports = {
  ValidasiToken,
};
