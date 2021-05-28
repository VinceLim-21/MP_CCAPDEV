const express = require(`express`);
const controller = require("../controllers/controller.js");
const signupController = require('../controllers/signupController.js');
const successController = require('../controllers/successController.js');
const loginController = require('../controllers/loginController.js');
const validation = require('../helpers/validation.js');
const accountController = require('../controllers/accountController.js');
const logoutController = require('../controllers/logoutController.js');
const commentController = require('../controllers/commentController.js');

const app = express();

app.get(`/home`, controller.getHome);

app.get(`/favicon.ico`, controller.getFavicon);

//executes function getIndex(), when a client sends an HTTP GET request for `/`
app.get(`/`, controller.getIndex);

//executes function getSignUp(), when a client sends an HTTP GET request for `/signup`
app.get(`/signup`, signupController.getSignUp);

//executes function postSignUp(), when a client sends an HTTP GET request for `/signup`
app.post(`/signup`, validation.signupValidation(), signupController.postSignUp);

//executes function getCheckID(), when a client sends an HTTP GET request for `/getCheckID`
app.get(`/getCheckNumber`, signupController.getCheckNumber);

//executes function getCheckID(), when a client sends an HTTP GET request for `/getCheckID`
app.get(`/success`, successController.getSuccess);

app.get(`/aboutUs`,controller.getAbout);

app.get(`/login`, loginController.getLogin);

app.post(`/login`, loginController.postLogin);

app.get(`/myAccount/:number`, accountController.getAccount);

app.get('/logout', logoutController.getLogOut);

app.get(`/getCheckNo`,commentController.getCheckNo);

app.get('/getCheckUname',commentController.getCheckUname);

app.get('/getDelete',commentController.getDelete);

app.get('/getIndex',commentController.getIndex);

app.get('/addComment',commentController.addComment);

module.exports = app;