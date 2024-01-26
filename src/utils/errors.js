export const formatAPIErrors = (errorResponse) => { 
    const errors = {}
    if(typeof errorResponse !== 'undefined') { 
        if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'message')) {
            errors.apiError = errorResponse.data.message
        }
        else {
            errors.apiError = "Network error. Try again later."
        }

        if(Object.prototype.hasOwnProperty.call(errorResponse.data, 'errors')) {
            const errorFields = Object.keys(errorResponse.data.errors)

            // insert laravel errors
            errorFields.map(field => {
                errors[field] = errorResponse.data.errors[field][0]
            });
        }
    }
    
    return errors
}