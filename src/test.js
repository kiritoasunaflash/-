export const sum = (list) => {
  let a = 0;
  a = list.reduce((a, c) => a + c, 0);
  return a;
};
// export const sum = (a, b) => {
//   return a + b;
// };
