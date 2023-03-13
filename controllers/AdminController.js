const appointment = require('../models/appointment');
const user = require('../models/user');
const Image = require('../models/image');
const treatment = require('../models/treatmentSchema');
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
const notdoneappoitment = async (req, res) => {
  try {
    const userId = req?.params?.id;
    console.log(userId);
    if (userId) {
      const searchedappointment = await appointment.findByIdAndUpdate(userId, {
        done: false,
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
const addimage = async (req, res) => {
  console.log(req.body.title); //aya
  console.log(req.file); //file fih originalname buffer.....;
  try {
    // Create new image document
    const newimage = new Image({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    // Save image to database
    const finalres = await newimage.save();

    res.send(finalres);
  } catch (error) {
    res.send(error.message);
  }
};
const getimage = async (req, res) => {
  const imageId = req?.params?.id;
  // Retrieve image from database
  const image = await Image.findById(imageId);
  // Set Content-Type header to JPEG
  res.set('Content-Type', 'image/png');

  res.send(image.data);
};
const changetreatment = async (req, res) => {
  try {
    const userId = req?.body.id;
    const newtreatment = {
      title: req?.body.title,
      body: req?.body?.body,
      img: req?.body.img,
      ved: req?.body?.ved,
    };
    if (userId) {
      //Create new image document
      const newimage = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      });
      const finalres = await newimage.save();
      console.log({ ...newtreatment, DesktopImg: finalres._id });
      const changedtreatment = await treatment.findByIdAndUpdate(
        userId,
        { ...newtreatment, DesktopImg: finalres._id },
        { new: true }
      );

      res.send(changedtreatment);
    }
  } catch (error) {
    res.send(error.message);
  }
};
const delettreatment = async (req, res) => {
  try {
    const treatmentId = req?.params?.id;
    const deletedgtreatment = await treatment.findByIdAndDelete(treatmentId);
    res.send(deletedgtreatment);
  } catch (error) {
    res.send(error.message);
  }
};
const addtreatment = async (req, res) => {
  try {
    const newtreatment = {
      title: req?.body?.title,
      body: req?.body?.body,
      img: req?.body?.img,
      ved: req?.body?.ved,
    };

    const newimage = new Image({
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });
    const finalres = await newimage.save();
    console.log({
      ...newtreatment,
      DesktopImg: finalres._id,
    });
    const addedtreatment = await treatment.create({
      ...newtreatment,
      DesktopImg: finalres._id,
    });
    res.send(addedtreatment);
  } catch (error) {
    res.send(error.message);
  }
};
module.exports = {
  notdoneappoitment,
  addtreatment,
  changetreatment,
  getimage,
  addimage,
  unblockuser,
  deleteappoitment,
  getdates,
  doneappoitment,
  getAllusers,
  blockuser,
  delettreatment,
};
