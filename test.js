function compressString(str) {
  let result = ''
  let count = 1

  for (let i = 0; i < str.length; i++) {

    // If current character is same as next
    if (str[i] === str[i + 1]) {
      count++
    } 
    // If different OR end of string
    else {
      result = result + str[i] + count
      count = 1
    }
  }

  return result
}

console.log(compressString("amaaarrrdutt"))
