const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const USerSchema = new mongoose.Schema({
  password: {type: String, required: true},
  username: {type: String, required: true, min: 6, max: 15},
  role: {type: String, enum: ['user', 'admin'], require: true},
  todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});

USerSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    this.password = passwordHash;
    next();
  })
});

USerSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else if (!isMatch) return cb(null, isMatch);
    else return cb(null, this);
  })
}

module.exports = mongoose.model('User', USerSchema);