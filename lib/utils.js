'use strict'

const crypto = require('crypto')

const utils = {
  extractTags,
  normalize,
encrypt}

function extractTags (text) {
  if (text == null) return []

  let matches = text.match(/#(\w+)/g) // inicia con # cada palabra hasta que encuentre espacio - /g es una expresion regula global que va a aplicar con todas las palabras  del texto 

  if (matches === null) return []

  matches = matches.map(normalize) // en cada una de las pocisiones del objeto se va a ejecutar a funcion normalize
  return matches
}

function normalize (text) {
  text = text.toLowerCase()
  text = text.replace(/#/g, '')
  return text
}

function encrypt (password) {
  let shasum = crypto.createHash('sha256')
  shasum.update(password)
  return shasum.digest('hex')
}

module.exports = utils
