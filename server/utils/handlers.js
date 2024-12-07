exports.asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

exports.validateRequest = (body) => {
  if (body.email) {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegEx.test(body.email)) {
      throw new Error("Invalid Credentials");
    }
  }
  if(body?.password.length < 4)
  {
    throw new Error("Password length must be greater than 4");
  }
  return "Valid Credentials";
};
