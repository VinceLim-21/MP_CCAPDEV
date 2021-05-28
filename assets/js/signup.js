$(document).ready(function () {

    // $('#email').keyup(function () {
    //     // your code here
    //     var email = $("#email").val();

    //     $.get("/getCheckEmail", {email: email}, function(result){
    //         if (result.email == email){
    //             $("#email").css("background-color", "red");
    //             $("#error").html("Email is already in use.")
    //             $("#submit").prop("disabled", true);
    //         }
            
    //         else{
                
    //             $("#email").css("background-color", "#E3E3E3");
    //             $("#error").html("")
    //             $("#submit").prop("disabled", false);
    //         }
    //     });
    // });

    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var username = validator.trim($('#username').val());
        var number = validator.trim($('#number').val());
        var psw = validator.trim($('#psw').val());
        var fName = validator.trim($('#fName').val());
        var lName = validator.trim($('#lName').val());
        var address = validator.trim($('#address').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var usernameEmpty = validator.isEmpty(username);
        var numberEmpty = validator.isEmpty(number);
        var pswEmpty = validator.isEmpty(psw);
        var fNameEmpty = validator.isEmpty(fName);
        var lNameEmpty = validator.isEmpty(lName);
        var addressEmpty = validator.isEmpty(address);

        return !usernameEmpty && !numberEmpty && !pswEmpty && !fNameEmpty && !lNameEmpty && !addressEmpty;
    }

    function isValidNumber(field, callback) {

        /*
            gets the value of `idNum` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains exactly 8 digits
        */
        var number = validator.trim($('#number').val());
        var isValidLength = validator.isLength(number,{min: 11,max: 11});
       

        // if the value of `idNum` contains exactly 8 digits
        if(isValidLength) {

            console.log("true")
            $.get('/getCheckNumber', {number: number}, function (result) {

                // if the value of `idNum` does not exists in the database
                if(result.number != number) {

                    /*
                        check if the <input> field calling this function
                        is the `idNum` <input> field
                    */
                    if(field.is($('#number')))
                        // remove the error message in `idNumError`
                        $('#numberError').text('');

                    /*
                        since  the value of `idNum` contains exactly 8 digits
                        and is not yet used by another user in the database
                        return true.
                    */
                    return callback(true);

                }

                // else if the value of `idNum` exists in the database
                else {

                    /*
                        check if the <input> field calling this function
                        is the `idNum` <input> field
                    */
                    if(field.is($('#number')))
                        // display appropriate error message in `idNumError`
                        $('#numberError').text('Number already exist');

                    /*
                        since the value of `idNum`
                        is used by another user in the database
                        return false.
                    */
                    return callback(false);
                }
            });
        }

        // else if the value of `idNum` is less or more than 8 digits
        else {

            /*
                check if the <input> field calling this function
                is the `idNum` <input> field
            */
            if(field.is($('#number')))
                // display appropriate error message in `idNumError`
                $('#numberError').text('Number should contain 11 digits.');

            /*
                since the value of `idNum` is less or more than 8 digits
                return false.
            */
            return callback(false);
        }
    }



    function isValidPassword(field) {

        // sets initial value of return variable to false
        var validPassword = false;

        /*
            gets the value of `pw` in the signup form
            removes leading and trailing blank spaces
            then checks if it contains at least 8 characters.
        */
        var password = validator.trim($('#psw').val());
        var isValidLength = validator.isLength(password, {min: 8});

        // if the value of `pw` contains at least 8 characters
        if(isValidLength) {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#psw')))
                // remove the error message in `idNumError`
                $('#pswError').text('');

            /*
                since  the value of `pw` contains at least 8 characters
                set the value of the return variable to true.
            */
            validPassword = true;
        }

        // else if the value of `pw` contains less than 8 characters
        else {

            /*
                check if the <input> field calling this function
                is the `pw` <input> field
            */
            if(field.is($('#psw')))
                // display appropriate error message in `pwError`
                $('#pswError').text(`Passwords should contain at least 8
                    characters.`);
        }

        // return value of return variable
        return validPassword;
    }
 

    function validateField(field, fieldName, error) {

        /*
            gets the value of `field` in the signup form
            removes leading and trailing blank spaces
            then checks if the trimmed value is empty.
        */
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        // if the value of `field` is empty
        if(empty) {
            /*
                set the current value of `field` to an empty string
                this is applicable if the user just entered spaces
                as value to the `field`
            */
            field.prop('value', '');
            // display approriate error message in `error`
            error.text(fieldName + ' should not be empty.');
        }

        // else if the value of `field` is not empty
        else
            // remove the error message in `error`
            error.text('');

        // call isFilled() function to check if all field are filled
        var filled = isFilled();

        /*
            call isValidPassword() function
            to check if the value of `pw` field is valid
        */
        var validPassword = isValidPassword(field);

        /*
            call isValidID() function
            to check if the value of `idNum` field is valid
        */
        isValidNumber(field, function (validNumber) {

            /*
                if all fields are filled
                and the password contains at least 8 characters
                and the ID number contains exactly 8 digits and is unique
                then enable the `submit` button
            */
            if(filled && validPassword && validNumber)
                $('#submit').prop('disabled', false);

            /*
                else if at least one condition has not been met
                disable the `submit` button
            */
            else
                $('#submit').prop('disabled', true);
        });
    }

    /*
        attach the event `keyup` to the html element where id = `fName`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#username').keyup(function () {

        // calls the validateField() function to validate `fName`
        validateField($('#username'), "Username", $('#usernameError'));
    });

    $('#number').keyup(function () {

        // calls the validateField() function to validate `pw`
        validateField($('#number'), 'Mobile Number', $('#numberError'));
    });

    $('#psw').keyup(function () {

        // calls the validateField() function to validate `pw`
        validateField($('#psw'), 'Password', $('#pswError'));
    });


    /*
        attach the event `keyup` to the html element where id = `lName`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#fName').keyup(function () {

        // calls the validateField() function to validate `lName`
        validateField($('#fName'), 'First Name', $('#fNameError'));
    });

    /*
        attach the event `keyup` to the html element where id = `idNum`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#lName').keyup(function () {

        // calls the validateField() function to validate `idNum`
        validateField($('#lName'), 'Last Name', $('#lNameError'));
    });

    $('#address').keyup(function () {

        // calls the validateField() function to validate `pw`
        validateField($('#address'), 'Address', $('#addressError'));
    });

});