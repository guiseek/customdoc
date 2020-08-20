export function createFile(data: BlobPart, name: string, type?: string) {
  return new File([data], name, { type });
}

export function saveFile(data: BlobPart, name: string, type?: string) {
  const file = createFile(data, name, type);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

export function modifySelection(
  { textContent }: Node,
  prefix: string,
  suffix = ''
) {
  return `${prefix}${textContent}${suffix}`;
}
