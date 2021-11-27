export function createTimeStr (str) {
  console.log(str)
  return (str || '').substr(0, 19).replace(/T/, ' ')
}