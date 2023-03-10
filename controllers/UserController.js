const carousel = require('../models/carouselSchema');
const treatment = require('../models/treatmentSchema');
const AuthUser = require('../models/user');
const appointment = require('../models/appointment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv = require('dotenv');
dotenv.config();
const { validationResult } = require('express-validator');
const getCarousel = async (req, res) => {
  try {
    let data = await carousel.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
};
const gettreatment = async (req, res) => {
  try {
    let data = await treatment.find();
    res.json(data);
  } catch (error) {
    res.json(error.message);
  }
};
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      const saltRounds = 10;
      const hashedpass = await bcrypt.hash(password, saltRounds);
      const newuser = await AuthUser.create({
        email,
        password: hashedpass,
      });
      console.log(newuser);
      res.json(newuser);
    }
  } catch (error) {
    res.send(error.message);
  }
};
const signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json('invalid email or password');
    } else {
      const { email, password } = req.body;
      const signeduser = await AuthUser.findOne({ email });
      const istrue = await bcrypt.compare(password, signeduser.password);
      if (istrue) {
        // generate a key : token
        const token = await jwt.sign(
          { id: signeduser._id },
          process.env.SECRET,
          {
            expiresIn: '30d',
          }
        );
        console.log(token);
        res.json({ signeduser, token });
      } else {
        return res.status(400).json('invalid email or password');
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};
// const getdates = async (req, res) => {
//   try {
//     const appointments = await appointment.find();
//     res.send(appointments);
//   } catch (error) {
//     res.send(error.message);
//   }
// };
const addappoitment = async (req, res) => {
  try {
    const { date, userid } = req.body;
    console.log(req.body);
    await appointment.create({ date: date, patient: userid });
    console.log(date);
    res.send(date);
  } catch (error) {
    res.send(error.message);
  }
};
const getappoitments = async (req, res) => {
  try {
    const pastappointments = await appointment.find({ patient: req.user });
    console.log(pastappointments)
    res.json(pastappointments);
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  getCarousel,
  gettreatment,
  register,
  signin,
  addappoitment,
  getappoitments,
};
