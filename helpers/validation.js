
// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    /*
        function which returns an array of validation middlewares
        called when the client sends an HTTP POST request for `/signup`
    */
    signupValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
        var validation = [

            check(`username`, `Username should not be empty.`).notEmpty(),

            check('number', 'Number should contain at least 11 digits.')
            .isLength({min: 11, max: 11}),

             // checks if `pw` contains at least 8 characters
            check('psw', 'Passwords should contain at least 8 characters.')
            .isLength({min: 8}),

            // checks if `fName` is not empty
            check('fName', 'First name should not be empty.').notEmpty(),

            // checks if lName is not empty
            check('lName', 'Last name should not be empty.').notEmpty(),

            check("address", `Address should not be empty.`).notEmpty()
           
        ];

        return validation;
    }
}

/*
    exports the object `validation` (defined above)
    when another script exports from this file
*/
module.exports = validation;
