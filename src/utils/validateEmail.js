const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

export default validateEmail;
