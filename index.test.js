const test = require('ava')
const http = require('http')
const send = require('@polka/send-type')
const listen = require('test-listen')
const fetch = require('node-fetch')

const { json, form } = require('./index')
const jsonsrv = http.createServer(async (req, res) => {
  const data = await json(req)
  return send(res, 200, data)
})

const formsrv = http.createServer(async (req, res) => {
  const data = await form(req)
  return send(res, 200, data)
})

test('json', async t => {
  const url = await listen(jsonsrv)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      a: 'b',
      c: {
        d: 'e'
      }
    })
  })

  const jsonData = await res.json()
  t.is(jsonData.a, 'b')
  t.is(jsonData.c.d, 'e')
})

test('form', async t => {
  const url = await listen(formsrv)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'a=b&c[d]=e'
  })

  const formData = await res.json()
  t.is(formData.a, 'b')
  t.is(formData.c.d, 'e')
})