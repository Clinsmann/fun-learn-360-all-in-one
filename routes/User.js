const express = require('express');
const userRouter = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const Todo = require('../models/Todo');
const passportConfig = require('../passport');//do not remove passport config
const {errorMessage, successMessage} = require('../utils/response');

const signToken = user => (JWT.sign(
  {iss: process.env.JWT_SECRET, sub: user._id, user},
  process.env.JWT_SECRET,
  {expiresIn: "1 day"}
));

userRouter.post('/register', (req, res) => {
  const {username, password, role} = req.body;
  User.findOne({username}, (err, user) => {
    if (err) res.status(500).json(errorMessage(err));
    if (user) res.status(500).json(errorMessage('Username is already taken'));
    else {
      const newUser = new User({username, password, role});
      newUser.save(err => {
        if (err) res.status(500).json(errorMessage(err));
        else res.status(201).json(successMessage('Account successfully created'));
      })
    }
  });
});

userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  if (req.isAuthenticated()) {
    const {_id, username, role} = req.user;
    const token = signToken({_id, username, role});
    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
    res.status(200).json({isAuthenticated: true, user: {username, role}, token});
  }
});

userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  // res.clearCookie('access_token');
  req.logout();
  req.session.destroy(err => {
    if (!err) res.json({user: {username: '', role: ''}, success: true});
  });
  // res.json({user: {username: '', role: ''}, success: true});
});

userRouter.post('/todo', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    req.user.todos.push(todo);
    await req.user.save();
    res.status(200).json(successMessage('Successfully created todo'));
  } catch (e) {
    res.status(500).json(errorMessage('Error creating todo'));
  }
});

userRouter.get('/todo', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById({_id: req.user._id}).populate('todos').exec((err, document) => {
    if (err) res.status(500).json(errorMessage('Error has occurred'));
    else res.status(200).json({todos: document.todos, authenticated: true});
  });
});

userRouter.get('/admin', passport.authenticate('jwt', {session: false}), (req, res) => {
  if (req.user.role === 'admin') res.status(200).json(successMessage('You are an admin'));
  else res.status(403).json(errorMessage('You are not an admin'));
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {username, role} = req.user;
  res.status(200).json({isAuthenticated: true, user: {username, role}});
});

module.exports = userRouter;
