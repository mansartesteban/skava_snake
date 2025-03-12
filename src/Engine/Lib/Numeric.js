  const num = (number = 0, precision = 4) => {
    let factor = Math.pow(10, precision);
    let n = precision < 0 ? number : 0.01 / factor + number;
    return Math.round(n * factor) / factor;
  }
  const isBetween = (number = 0, min = 0, max = 0, strict = false) => {
    return strict
      ? number > min && number < max
      : number >= min && number <= max;
  }
  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const mapRange = (x = 0, fromMin = 0, fromMax = 0, toMin = 0, toMax = 0) => {
    return toMin + ((toMax - toMin) / (fromMax - fromMin)) * (x - fromMin);
  }
  const minMax = (x = 0, min = 0, max = 0) => {
    return x < min ? min : x > max ? max : x;
  }
  const clamp = (num = 0, min = 0, max = 0) => {
    return Math.min(Math.max(num, min), max);
  }
  const randomHexadecimal = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
  const degreesToRadians = (degrees = 0) => {
    return (degrees * Math.PI) / 180;
  }
  const radiansToDegrees = (radians = 0) => {
    return radians * (180 / Math.PI);
  }
  const lerp = (a, b, delta) => {
    delta = clamp(delta, 0, 1);
    return (1 - delta) * a + delta * b;
  }

export {
  num,
  isBetween,
  random,
  mapRange,
  minMax,
  clamp,
  lerp,
  randomHexadecimal,
  degreesToRadians,
  radiansToDegrees,
}