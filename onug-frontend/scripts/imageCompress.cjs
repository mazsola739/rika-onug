const sharp = require('sharp')

sharp('public/assets/backgrounds/wood.png')
  .webp({ lossless: true })
  .toFile('public/assets/backgrounds/wood.webp', (err, info) => {
    console.log(err)
    console.log(info)
  })
