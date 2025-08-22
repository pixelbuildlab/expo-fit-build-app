const isValidEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

console.log(isValidEmail('test@gma.com'));
