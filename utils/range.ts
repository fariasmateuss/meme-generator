export const range = (start = 0, end = start, step = 1) => {
  const output = [];

  for (let i = start; i < end; i += step) {
    output.push(i);
  }

  return output;
};
