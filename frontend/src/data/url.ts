export const activeURL = 'https://qsh7f3unze.execute-api.us-east-2.amazonaws.com/prod'

export const getAllProducts = `${activeURL}/products`

export const getProductById = (id:string) => `${activeURL}/products/${id}`