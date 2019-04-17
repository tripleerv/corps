const getRawBody = require('./rawBody.js')
const { parse } = require('qs')

const parseJSON = str => {
  try {
    return JSON.parse(str)
  } catch (err) {
    throw new Error('Invalid JSON', err)
  }
}

const buffer = req =>
  Promise.resolve().then(() =>
    getRawBody(req)
      .then(buf => buf)
      .catch(err => {
        throw new Error('Invalid body', err)
      })
  )

const json = req => buffer(req).then(body => parseJSON(body))

const form = req => buffer(req).then(body => parse(body.toString()))

module.exports = { json, form }
