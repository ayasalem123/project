const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blocked:
  {
    type:Boolean,
    default:false,
  },
  Role: {
    type: String,
    dr: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = mongoose.model('AuthUser', UserSchema);
