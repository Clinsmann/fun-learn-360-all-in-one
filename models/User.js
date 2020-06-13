const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    trim: true,
    type: String,
    minlength: 2,
    // required: true
  },
  lastName: {
    trim: true,
    type: String,
    minlength: 2,
    // required: true
  },
  email: {
    trim: true,
    type: String,
    unique: true,
    // required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid');
    }
  },
  password: {
    trim: true,
    type: String,
    minlength: 6,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain password');
    }
  },
  username: {trim: true, type: String, required: true, min: 6, max: 15},
  tokens: [{
    token: {type: String, required: true}
  }],
  role: {type: String, enum: ['user', 'admin'], require: true},
  todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
}, {timestamps: true});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  })
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else if (!isMatch) return cb(null, isMatch);
    else return cb(null, this);
  })
}

UserSchema.methods.JSON = function () {
  const publicProfile = this.toObject();
  delete publicProfile.timestamps;
  delete publicProfile.password;
  return publicProfile;
}

module.exports = mongoose.model('User', UserSchema);