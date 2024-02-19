
function errorHandler(error, req, res, next){
  switch (error.name) {
      case "EmailIsRequired":
          statusCode = 400
          message = "Email is required"
          break;
      case "PasswordIsRequired":
          statusCode = 400
          message = "Password is required"
          break;
      
      case "UserNotExist":
      case "PasswordInvalid":
          statusCode = 401
          message = "Invalid Email / Password"
          break;
      
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
          statusCode = 401
          message = error.errors[0].message
          break;
      
      case "InvalidToken":
      case "JsonWebTokenError":
          statusCode = 401;
          message = 'Invalid Token';
          break;

      case "ForbiddenAccess":
          statusCode = 403;
          message = 'Forbidden Access';
          break;

      case "ErrorNotFound":
          statusCode = 404;
          message = 'Error not found';
          break;

        case "AlreadyPremium":
            statusCode = 400;
            message = 'Already premium';
            break;
  }

  res.status(statusCode).json({ message })
}

module.exports = errorHandler