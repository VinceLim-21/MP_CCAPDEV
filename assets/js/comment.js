$(document).ready(function () {
	$('#cnumber').keyup(function () {
		$.get('/getCheckNo', {number: $("#cnumber").val()}, function (result) {
				console.log("YOOOO");
                // if the value of `number` does not exists in the database
                if(result.number != number) {

                    if(field.is($('#cnumber')))
                        $('#cerror').text('Number does not exist!');

                    return callback(false);
                }

                else {

                    if(field.is($('#cnumber')))
                        //$('#cerror').text('');
						$('#cerror').html('');
                    return callback(true);
                }
            });
	});
	
	$('#cuname').keyup(function () {
		$.get('/getCheckUname', {username: $("#cuname").val()}, function (result) {

                // if the value of `idNum` does not exists in the database
                if(result.number != number) {

                    if(field.is($('#cuname')))
                        //$('#cerror').text('Username is invalid');
						$('#cerror').html('Username is invalid');
                    return callback(false);
                }

                else {

                    if(field.is($('#cuname')))
                        //$('#cerror').text('');
						$('#cerror').html('');
                    return callback(true);
                }
            });
	});

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new transaction should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The name, reference number, and amount fields are reset to empty
            values.
    */
    $('#csubmit').click(function () {
		console.log(("#cnumber").val());
        // your code here
        if($("#cnumber").val().length == 0 || $("#cuname").val().length == 0 || $("#cmsg").val().length == 0){
            //$("#cerror").text("Fill up all fields.");
			$("#cerror").html("Fill up all fields.");
        }
        else if($("#cnumber").val().length > 0 && $("#cuname").val().length > 0 && $("#cmsg").val().length > 0){
			$.get('/addComment', {number : $("#cnumber").val(), username : $("#cuname").val(), comment : $("#cmsg").val()}, 
				function(html){
					$("#cerror").text("");
					$("form")[0].reset();
					$("#comments").append(html);
				})
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#cards`.
            The code deletes the specific transaction associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.card`.
    */
    $('#comments').on('click', '.remove', function () {
        // your code here
		let daddy = $(this).siblings().children('.text');
		
		$.get('/getDelete', {refno: $(daddy[1]).text()}, function(goodbye){});
		
		$(this).parent().remove();
    });

})
