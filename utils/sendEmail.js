const transporter = require("../config/nodemailerTransporter")
const dotEnv = require("dotenv")
dotEnv.config()

const sendEmail = (email, name, token) => {
    transporter.sendMail({
        to: email,
        subject: "Welcome to Temu. click to win $50,000",
        from: `Temu Platform`,
        html: `<div>
            <h2>Hello, ${name}</h2>
            <p>Welcome to TEMU, kindly click the link below to verify your account</p>
            <a style="background: blue; padding: .5rem 1rem; border-radius: 8px; color: white; text-decoration: none; text-align: center;"   href="${process.env.clientDomain}/verify/${token}">Verify my Account</a>
        </div>`,
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