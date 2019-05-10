const nodemailer = require("nodemailer");
const config = require("config");
class Mailer {
  async sendMail(text) {
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get("mail.username"), //change username and password per each client
        pass: config.get("mail.password")
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Front Desk 👻" <frontdesk@example.com>', // sender address
      to: "bibekgaihre123@outlook.com", // list of receivers
      subject: "Feedback ", // Subject line
      text: text, // plain text body
      html: "" // html body
    });
    return info;
    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
module.exports = new Mailer();
