const User = require('../models/User.model');


const jwt = require('jsonwebtoken');
const Encryption = require('../Encryption');

const AnotherPrivateKey = 'SuperSecretKeyForRefreshToken';
const privateKey = 'unbreakableKeyss';
const Encrypt = new Encryption();
const jwtExpirationTime = '1h';



exports.checkIfUserExists = async function(req,res,next){
  const user = await User.findOne({username: req.body.username}).exec();
  if (user) {
    res.status(432).send('Username already exists try another one')
  } else {
    next();
  }
}


exports.UserRegister = async function (req, res, next) {
  
  if (req.body.password === null) {
    res.status(403).send("Password is required!");
    return;
  }
  try {
    const encryptedPassword = await Encrypt.encrypt(req.body.password);
    let user = new User({
      username: req.body.username,
      password: encryptedPassword,
      IBeacon: [],
      Eddystone: [],
      QRScan: [],
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send('User Registered successfully');
    })
  } catch(e) {
    console.log(err);
  }
};

exports.UserLogin = async function (req, res, next) {

  if (req.body.password === null) {
    res.status(403).send("Password is required!");
    return;
  }

  try {
      const user = await User.findOne({username: req.body.username}).exec();
      if(!user){
        res.status(403).send('Wrong Username or Password');
        return;
      }
      const decryptedPassword = await Encrypt.decrypt(user.password);
      if (decryptedPassword === req.body.password) {
        try {
          const accessToken = await jwt.sign({userID: user._id}, privateKey, { expiresIn: jwtExpirationTime});
          const refreshToken = await jwt.sign({userID: user._id},AnotherPrivateKey);
          const tokens = {accessToken: accessToken, refreshToken: refreshToken};
          res.status(200).send(JSON.stringify(tokens, null, '\t'));
        } catch(e) {
          console.log(e);
          res.status(499).send(e.message);
        }
      } else res.status(401).send('Wrong username or password');
  } catch(e) {
    console.log(e);
    res.status(500).send("Unexpected internal server error!");
  }
};