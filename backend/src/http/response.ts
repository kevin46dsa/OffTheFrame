export function ok<T>(data: T) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  }
  
  export function created<T>(data: T) {
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    }
  }
  
  export function badRequest(message: string) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    }
  }
  
  export function notFound(message: string) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message }),
    }
  }
  
  export function serverError(message = 'Internal server error') {
    return {
      statusCode: 500,
      body: JSON.stringify({ message }),
    }
  }
  