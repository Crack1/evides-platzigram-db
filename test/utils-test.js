'use strict'

const test = require('ava')
const utils = require('../lib/utils')

test('Extrating hashtags from text', t => {
  let tags = utils.extractTags('a #picture with tags #AwEsOmE #Platzi #AVA a #100 ##yes')
  t.deepEqual(tags, [
    'picture', 'awesome', 'platzi', 'ava', '100', 'yes'
  ])

  tags = utils.extractTags()
  t.deepEqual(tags, [])

  tags = utils.extractTags(null)
  t.deepEqual(tags, [])
})

test('Encrypt password', t => {
  let password = 'foo123'
  let encrypted = '02b353bf5358995bc7d193ed1ce9c2eaec2b694b21d2f96232c9d6a0832121d1'

  let result = utils.encrypt(password)
  t.is(result, encrypted)
})

// test('this should support async/await', async t => {
// 	let p = Promise.resolve(42)
// 	let secret = await p
// 	t.is(secret, 42)
// })
