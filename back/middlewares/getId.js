const jwt = require('jsonwebtoken');
const users = require('../controllers/users');
const dotenv = require("dotenv");
dotenv.config();

exports.getId = (req, res) => {
  // console.log("get id ", req.headers)
    const token = req.headers.authorization
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken._id;
    return userId;
  }
