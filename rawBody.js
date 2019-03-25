module.exports = stream => {
  let buffers = []

  stream.on('data', chunk => {
    buffers.push(chunk)
  })

  stream.on('end', () => {
    return new Promise(resolve => {
      const rawBody = Buffer.concat(buffers)
      resolve(rawBody)
    })
  })
  return
}