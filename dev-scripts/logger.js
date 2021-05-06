module.exports = (req, res, next) => {
  console.log(`Request: ${req}
  Response: ${res}`);
  next();
};
