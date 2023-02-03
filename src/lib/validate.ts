import type {
  loginValidation,
  checkoutValidation,
  registerValidation,
} from "@/types/index";

export function loginValidate(values: loginValidation) {
  const errors: loginValidation = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}
export function registerValidate(values: registerValidation) {
  const errors: registerValidation = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name === "") {
    errors.name = "Invalid Username...!";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.passWord) {
    errors.passWord = "Required";
  } else if (values.passWord.length < 8 || values.passWord.length > 20) {
    errors.passWord = "Must be greater then 8 and less then 20 characters long";
  } else if (values.passWord.includes(" ")) {
    errors.passWord = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.passWord !== values.cpassword) {
    errors.cpassword = "Password Not Match...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}

export function checkoutValidate(values: checkoutValidation) {
  const errors: checkoutValidation = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name === "") {
    errors.name = "Invalid Username...!";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.address) {
    errors.address = "Required";
  } else if (values.address === "") {
    errors.address = "Invalid Address...!";
  }
  return errors;
}
