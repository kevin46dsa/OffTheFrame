const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
}

export function ok<T>(data: T) {
    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify(data),
    }
  }
  
  export function created<T>(data: T) {
    return {
      statusCode: 201,
      headers: defaultHeaders,
      body: JSON.stringify(data),
    }
  }
  
  export function badRequest(message: string) {
    return {
      statusCode: 400,
      headers: defaultHeaders,
      body: JSON.stringify({ message }),
    }
  }
  
  export function notFound(message: string) {
    return {
      statusCode: 404,
      headers: defaultHeaders,
      body: JSON.stringify({ message }),
    }
  }
  
  export function serverError(message = 'Internal server error') {
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({ message }),
    }
  }
  