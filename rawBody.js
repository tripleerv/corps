module.exports = stream => {
  return new Promise((resolve, reject) => {
    let buffers = []

    stream.on('data', chunk => {
      buffers.push(chunk)
    })

    stream.on('end', () => {
      let rawBody = Buffer.concat(buffers)
      resolve(rawBody)
    })

    stream.on('error', err => reject(err))
  })
}
