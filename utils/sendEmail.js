const transporter = require("../config/nodemailerTransporter")

const sendEmail = (email, name) => {
    transporter.sendMail({
        to: email,
        subject: "Welcome to Temu. click to win $50,000",
        from: `Temu Platform`,
        text: `Hello ${name}, Welcome to Temu App. We are glad to have you arround. start exploring our exclusive deals blah blah blah blah blah`,
        replyTo: "peter.babs.dev@gmail.com",
    }, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Email sent!`)
        }
    })
}

module.exports = sendEmail