const qr = require('qrcode')

async function qrPay() {
    const qrcode = await qr.toDataURL("https://link.dana.id/qr/jr4mtl3")
    return qrcode
}

module.exports = qrPay