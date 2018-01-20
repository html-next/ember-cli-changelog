module.exports = function(name, defaultValue) {
  if (process.env[name]) {
    return process.env[name];
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw new Error('Expected environment variable `' + name + '` to be set but it was not.');
  }
};
