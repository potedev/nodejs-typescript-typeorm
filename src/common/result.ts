export const Result = (success: Boolean, data: Object, errors?: any) => {

    if (!success && errors) {
        return {
            success: false,
            errors: {
                field: errors[0].property,
                message: errors[0].constraints
            }
        }
    }

    return {
        success: success,
        data: data
    }
}
