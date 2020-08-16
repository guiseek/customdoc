const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;';
const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------';

const p = new RegExp(a.split('').join('|'), 'g');

export function dropSpecialChars(str: string) {
  return str.toString().replace(p, (c) => b.charAt(a.indexOf(c)));
}

export function clearToSearch(str: string) {
  return dropSpecialChars(str)
    .replace(/[^\w\s]|_/g, '')
    .toLowerCase();
}
