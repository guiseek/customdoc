const nls = (length: number) => Array.from({ length }).fill('\n').join('');

export const output = {
  log: function (message: string, length = 1) {
    console.log(message + nls(length));
  },
  error: function (message: string, length = 1) {
    throw new Error(message + nls(length));
  }
}