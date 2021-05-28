const { validationResult } = require('express-validator');

const db = require('../models/db.js');

const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 11;

const signupController = {

    
    // executed when the client sends an HTTP GET request `/signup`
 
    getSignUp: function (req, res) {
        var details = {};

        // checks if a user is logged-in by checking the session data
        if(req.session.number) {

            /*
                sets `details.flag` to true
                to display the profile and logout tabs in the nav bar

                sets the value of `details.name` to `req.session.name`
                to display the name of the logged-in user
                in the profile tab of the nav bar

                sets the value of `details.uidNum` to `req.session.idNum`
                to provide the link the profile of the logged-in user
                in the profile tab of the nav bar

                these values are rendered in `../views/partials/header.hbs`
            */
            details.flag = true;
            details.name = req.session.name;
            details.uNumber = req.session.number;
            
        }

        // else if a user is not yet logged-in
        else
            /*
                sets `details.flag` to false
                to hide the profile and logout tabs in the nav bar
            */
            details.flag = false;

        // render `../views/signup.hbs`
        res.render('signup', details);
    },

    
   
    // executed when the client sends an HTTP POST request `/signup`
    postSignUp: function (req, res) {

        var errors = validationResult(req);

        // if there are validation errors
        if (!errors.isEmpty()) {

            // get the array of errors
            errors = errors.errors;

            var details = {}

            if(req.session.number) {

                /*
                    sets `details.flag` to true
                    to display the profile and logout tabs in the nav bar

                    sets the value of `details.name` to `req.session.name`
                    to display the name of the logged-in user
                    in the profile tab of the nav bar

                    sets the value of `details.uidNum` to `req.session.idNum`
                    to provide the link the profile of the logged-in user
                    in the profile tab of the nav bar

                    these values are rendered in `../views/partials/header.hbs`
                */
                details.flag = true;
                details.name = req.session.name;
                details.uNumber = req.session.number;
            }

            // else if a user is not yet logged-in
            else
                /*
                    sets `details.flag` to false
                    to hide the profile and logout tabs in the nav bar
                */
                details.flag = false;


            /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg`
                as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            /*
                render `../views/signup.hbs`
                display the errors defined in the object `details`
            */
            res.render('signup', details);
        }

        else{

            var username = req.body.username
            var number = req.body.number;
            var psw = req.body.psw;
            var fName = req.body.fName;
            var lName = req.body.lName;
            var address = req.body.address;


            bcrypt.hash(psw, saltRounds, function(err, hash) {

                var user = {
                    username: username,
                    number: number,
                    psw: hash,
                    fName : fName,
                    lName: lName,
                    address: address
                }
                console.log(user);
		      console.log("postsignup\n");
		      
		
            db.insertOne(User, user, function(flag) {
                if(flag) {
				    console.log("TRUE\n");
                    // add render content of user to Profile (**Missing**)
                    res.redirect('/success?fName=' + fName +'&lName=' + lName);
                }
			
            });
        });
        }
    },

	getCheckNumber: function (req, res) {

        var number = req.query.number;

        db.findOne(User, {number: number}, 'number', function (result) {
            res.send(result);
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;