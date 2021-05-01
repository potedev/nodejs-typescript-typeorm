// errors [
//     ValidationError {
//       target: Book { title: 'qs', description: 'qs', author: undefined },
//       value: 'qs',
//       property: 'title',
//       children: [],
//       constraints: { minLength: 'Title is too short' }
//     },
//     ValidationError {
//       target: Book { title: 'qs', description: 'qs', author: undefined },
//       value: 'qs',
//       property: 'description',
//       children: [],
//       constraints: { minLength: 'Description is too short' }
//     }
//   ]


import { ValidationError } from "class-validator"

export const parseError = (errors: ValidationError[]) => {
    console.log('errors', errors)

    //No errors
    if (!(errors.length > 0)) return false

    const parsedErrors = errors.map(error => {

        const message = error['constraints'] ? error['constraints'][Object.keys(error['constraints'])[0]] : 'Something went wrong'

        return {
            field: error['property'],
            message
        }
    })

    return parsedErrors
}