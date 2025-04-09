export function jsonResponce(statusCode, success, body) {
  return {
    statusCode: statusCode,
    success: success,
    body: body
  }
}