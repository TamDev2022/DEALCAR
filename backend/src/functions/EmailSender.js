const nodemailer = require("nodemailer");
const { MAIL_USERNAME, MAIL_PASSWORD } = require("../constant/_IndexConstant");

const EmailSender = async function (email, verifyCode) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: MAIL_USERNAME, // generated ethereal user
                pass: MAIL_PASSWORD, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        var message = {
            from: MAIL_USERNAME,
            to: email,
            subject: "Verify your account",
            html: `<p>Hello ${email} </p> <br>
                    <p>your verification code: </p> <h3>${verifyCode}</h3>
            `,
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log("Error occurred");
                error.message = "Email sending failed. " + error.message;
                error.status = 400;
                return reject(error);
            }
            console.log("Message sent successfully!");

            // only needed when using pooled connections
            transporter.close();
            resolve(true);
        });
    });
};

module.exports = EmailSender;
