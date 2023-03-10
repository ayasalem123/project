const appointment = require('../models/appointment');
const user = require('../models/user');
const getdates = async (req, res) => {
  try {
    const appointments = await appointment.find();
    res.send(appointments);
  } catch (error) {
    res.send(error.message);
  }
};
const deleteappoitment = async (req, res) => {
  try {
    if (req?.params?.id) {
      console.log(req.params.id);
      const searchedappointment = await appointment.findByIdAndDelete({
        _id: req.params.id,
      });
      res.send(searchedappointment);
    }
  } catch (error) {
    res.send(error.message);
  }
};
const getAllusers = async (req, res) => {
  try {
    const allusers = await user.find();
    res.send(allusers);
  } catch (error) {
    res.send(error.message);
  }
};

const doneappoitment = async (req, res) => {
  try {
    const userId = req?.params?.id;
    console.log(userId);
    if (userId) {
      const searchedappointment = await appointment.findByIdAndUpdate(userId, {
        done: true,
      });
      res.send(searchedappointment);
    }
  } catch (error) {
    res.send(error.message);
  }
};
const blockuser = async (req, res) => {
  try {
    const userId = req?.params?.id;
    console.log(userId);
    if (userId) {
      const searcheduser = await user.findByIdAndUpdate(userId, {
        blocked: true,
      });
      res.send(searcheduser);
    }
  } catch (error) {
    res.send(error.message);
  }
};
const unblockuser = async (req, res) => {
  try {
    const userId = req?.params?.id;
    console.log(userId);
    if (userId) {
      const searcheduser = await user.findByIdAndUpdate(userId, {
        blocked: false,
      });
      res.send(searcheduser);
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  unblockuser,
  deleteappoitment,
  getdates,
  doneappoitment,
  getAllusers,
  blockuser,
};
