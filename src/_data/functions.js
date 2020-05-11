module.exports.randomBetween = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};
