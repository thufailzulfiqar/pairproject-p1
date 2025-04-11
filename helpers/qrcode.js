const qr = require('qrcode')

async function qrCode() {
    const qrcode = await qr.toDataURL("https://www.instagram.com/hackfood.id?igsh=MTQwbDVqZXF3b2d5bA%3D%3D&utm_source=qr")
    return qrcode
}

module.exports = qrCode