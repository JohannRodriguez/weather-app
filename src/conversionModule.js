const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const convertNull = (string) => {
  if(string === null){
    return '';
  } else {
    return string;
  }
};

const decimals = (number) => {
  if(number % 1 !== 0) {
    return parseFloat(number.toFixed(2));
  } else {
    return number
  }
};

export { cap, convertNull, decimals };