export const camelCase = (str: string) => {
  const strUpdate = str
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, (match) =>
      match.charAt(match.length - 1).toUpperCase()
    );
  return strUpdate.charAt(0).toLowerCase() + strUpdate.substring(1);
};

export const trim = (str: string) => str.replace(/^\s+|\s+$/gm, '');
