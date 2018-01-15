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

// test('this should support async/await', async t => {
// 	let p = Promise.resolve(42)
// 	let secret = await p
// 	t.is(secret, 42)
// })