const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSignupValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: passwordComplexity(),
  });
  return schema.validate(data);
};

generateAuthToken = function (data) {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
  return token;
};
module.exports = { userSignupValidation };
