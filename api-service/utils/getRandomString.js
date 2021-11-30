export function getRandomString(n = 5) {
  const digits = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&*()_-[]{}";

  let ret = "";

  let x;

  for (x = 0; x < n; x++) {
    let char = digits[Math.floor(Math.random() * (digits.length - 1))];

    ret = ret + char;
  }

  return ret;
}
