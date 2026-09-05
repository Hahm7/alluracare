// Script to validate all input using sweetalert (frontend validation)
function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validateAll() {

    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    // var subject = $("#subject").val();
    var message = $("#message").val();
    var checkbox = $("input[name=accept]").is(":checked")

    if (name == '') {
        swal("Oppss !", "Name field cannot be empty.", "error");
        return false
    }
    else if (email == '') {
        swal("Oppss !", "Email field cannot be empty.", "error");
        return false
    }
    else if (!(validateEmail(email))) {
        swal("Oppss !", "Put a valid email address", "error");
        return false
    }
    else if (phone == '') {
        swal("Oppss !", "Phone field cannot be empty.", "error");
        return false
    }
    // else if (subject == '') {
    //     swal("Oppss !", "Subject field cannot be empty.", "error");
    //     return false
    // }
    else if (message == '') {
        swal("Oppss !", "Message field cannot be empty.", "error");
        return false
    }
    // else if (checkbox == '') {
    //     swal("Opps !", "You must consent to sharing your personal information.", "info");
    // }
    else {
        return true;
    }


}
$("#send").bind("click", validateAll);


// Script to put the first letters in name as uppercase

$("#name").keyup(function() {
    var txt = $(this).val();
    $(this).val(txt.replace(/^(.)|\s(.)/g, function($1){
        return $1.toUpperCase();
    }));
})

// Script to accept only letters

$(document).ready(function() {
    jQuery('input[name="name"').keyup(function() {
        var letter = jQuery(this).val();
        var allow = letter.replace(/[^a-zA-Z _]/g, '');
        jQuery(this).val(allow);
    });
    // Prevent starting with space
    $("input").on("keypress", function(e) {
        if (e.which === 32 && !this.value.length)
            e.preventDefault();
    });
});

// Script to lowercase input email

$(document).ready(function() {
    $("#email").keyup(function() {
        this.value = this.value.toLowerCase();
    });
});
