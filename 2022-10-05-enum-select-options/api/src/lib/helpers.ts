export const label = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(' ')
}
