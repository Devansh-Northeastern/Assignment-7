$(document).ready(() => {
    console.log("here")
    // Function to check for null or empty values
   const isEmpty = (str) => {
    return (!str || 0 === str.length);
}

// Function to highlight field and display error message
const displayErrorAndHighlightField = (fieldId, errorMessage) => {
    $(fieldId).next('.error').text(errorMessage);
    $(fieldId).css('border-color', 'red');
}

// Function to clear error and remove highlighting
const clearErrorAndHighlightField = (fieldId) => {
    $(fieldId).next('.error').text(''); // Clear error message
    $(fieldId).css('border-color', ''); // Remove red border
}

const validatePassword = (password) => {
    // Minimum length check
    const minLength = 8;
    if (password.length < minLength) {
        displayErrorAndHighlightField('#password',  "Password should be at least 8 characters long");
        return false
    }

    // Check for special characters
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
        displayErrorAndHighlightField('#password',  "Password should contain at least one special character");
        return false
    }

    // Additional criteria like uppercase, lowercase, numbers, etc., can be added as needed

    return true; // Return valid message if all conditions are met
}


$('#email, #userName, #password, #confirmPassword').on('keyup', (event) => {
    const id = event.target.id;
    const value = $(event.target).val().trim();
    if(value){
        // Enable or disable login button based on form validity
        $('#loginButton').prop('disabled', false);
        clearErrorAndHighlightField(`#${id}`);
    }
})

// Login button click event
$('#loginButton').on('click', (e) => {
    e.preventDefault(); // Prevent form submission for demo

    // Perform validations on login page fields
    let isValid = true;

    // Email field validation
    const email = $('#email').val().trim();
    if (isEmpty(email)) {
        displayErrorAndHighlightField('#email', 'Email field cannot be empty');
        isValid = false;
    } else if(!email.includes("@northeastern")) {
        // Other email validations as required
        displayErrorAndHighlightField('#email', 'Email ID provided is not northeastern email');
        isValid = false
    }

    // UserName field validation
    const userName = $('#userName').val().trim();
    if (isEmpty(userName)) {
        displayErrorAndHighlightField('#userName', 'User Name field cannot be empty');
        isValid = false;
    }

    // Password field validation
    const password = $('#password').val().trim();
    if (isEmpty(password)) {
        displayErrorAndHighlightField('#password', 'Password field cannot be empty');
        isValid = false;
    } else if(!validatePassword(password)) {
        // Other Password validations as required
        isValid= false;
    }

    // Confirm Password field validation
    const confirmPassword = $('#confirmPassword').val().trim();
    if (isEmpty(confirmPassword)) {
        displayErrorAndHighlightField('#confirmPassword', 'Confirm Password field cannot be empty');
        isValid = false;
    } 

    // check if password and confirm password is same or not
    if(password != confirmPassword){
        displayErrorAndHighlightField('#confirmPassword', 'Password is not matching');
        isValid = false;
    }

    // Enable or disable login button based on form validity
    $('#loginButton').prop('disabled', !isValid);

    // If all fields are valid, proceed with the login
    if (isValid) {
        $('#loginPage').hide();
        $('#secondPage').show();
        $('#loggedInUserName').text(userName);
    }
    });
});