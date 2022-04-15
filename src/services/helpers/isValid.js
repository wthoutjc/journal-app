import validator from "validator";

const registeredValid = ({name, email, password, password2}) => {
  let valid = {
    error: true,
    title: "Error",
    message: null,
  };

  if (!name || !email || !password || !password2) {
    valid = {
      ...valid,
      message: "All fields are required",
    };
  } else if (name.trim().length < 3) {
    valid = {
      ...valid,
      message: "Name is not valid!",
    };
  } else if (!validator.isEmail(email)) {
    valid = {
      ...valid,
      message: "Email is not valid!",
    };
  } else if (password !== password2 || password.length < 8) {
    valid = {
      ...valid,
      message: "Password should be a least 8 characters and match each other!",
    };
  } else {
    valid = {
      error: false,
      title: "Success",
      message: "Successfully registered!",
    };
  }

  return valid;
};

export { registeredValid };
