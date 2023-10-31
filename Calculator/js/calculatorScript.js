$(document).ready(() => {

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

    // Perform number validations
    const numberValidation = (value, id) => {
        id = `#${id}`

        // Null check
        if (!value) {
            displayErrorAndHighlightField(id, "Field cannot be empty");
            return false
        }

        // Check for only numbers
        const numbersRegex = /^[0-9]+$/;
        if (!numbersRegex.test(value)) {
            displayErrorAndHighlightField(id, "Field should contain only numbers");
            return false
        }

        // Check for special characters
        const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (specialCharactersRegex.test(value)) {
            displayErrorAndHighlightField(id, "Field should not contain special characters");
            return false
        }

        // Infinite value check (if input represents a number)
        if (!isFinite(value)) {
            displayErrorAndHighlightField(id, "Input cannot be infinite");
            return false
        }

        return true
    }

    // Calculation and Validation
    const performOperation = (operation) => {
        // Fetching values and performing operations
        const num1 = parseFloat($('#number1').val());
        const num2 = parseFloat($('#number2').val());
        let result;
        
        // Perform the chosen operation
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num2 !== 0 ? num1 / num2 : 'Infinity';
                break;
            default:
                result = 'Error';
        }

        $('#result').val(result);
    };

    // Event listeners for operation buttons
    $('#add, #subtract, #multiply, #divide').on('click', (event) => {
        const operation = event.target.id;
        performOperation(operation);
    });

    // Perform input validations
    $('#number1, #number2').on('keyup', (event) => {
        const value = $(event.target).val().trim();
        const id = event.target.id;

        // Validation logic for number inputs
        const isValid = numberValidation(value, id)

        if(isValid)
            clearErrorAndHighlightField(`#${id}`);
    });
});
