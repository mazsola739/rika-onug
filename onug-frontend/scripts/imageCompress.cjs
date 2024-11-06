const sharp = require('sharp')

sharp('public/assets/tokens/pic3634423-modified(1).png')
  .webp({ lossless: true })
  .toFile('public/assets/tokens/pic3634423-modified(1).webp', (err, info) => {
    console.log(err)
    console.log(info)
  })
