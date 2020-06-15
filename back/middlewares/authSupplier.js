const jwt = require('jsonwebtoken');
const suppliers = require('../controllers/suppliers');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  console.log("auth "+req.headers.authorization);
  try {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    if (!await suppliers.getSupplierFromId(req, res, userId)) {
      console.log('auth failed')
      throw 'Invalid user ID';
    } else {
      console.log('Id verified')
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
