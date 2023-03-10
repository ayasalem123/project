const express = require('express');
const { DataValidation } = require('../middlewares/DataValidation');
const { AuthMiddleware } = require('../middlewares/Authmiddlwear');
const {
  getCarousel,
  gettreatment,
  register,
  signin,

  getappoitments,
  addappoitment,
} = require('../controllers/UserController');
const {
  unblockuser,
  blockuser,
  getAllusers,
  getdates,
  doneappoitment,
  deleteappoitment,
} = require('../controllers/AdminController');
const router = express.Router();
router.get('/carousel', getCarousel);
router.get('/treatment', gettreatment);
router.get('/book', getdates);
router.get('/allusers', getAllusers);
router.post('/book', addappoitment);
router.put('/done/:id', doneappoitment);
router.put('/block/:id', blockuser);
router.put('/unblock/:id', unblockuser);
router.delete('/delete/:id', deleteappoitment);
router.get('/appointments', AuthMiddleware, getappoitments);
router.post('/register', DataValidation, register);
router.post('/signin', DataValidation, signin);
module.exports = router;
