import nodemailer from "nodemailer";

export class EmailClient {
  static #INSTANCE;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.APP_EMAIL_SERVICE,
      auth: {
        user: process.env.APP_EMAIL_LOGIN,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
  }

  static getInstance() {
    if (!EmailClient.#INSTANCE) {
      EmailClient.#INSTANCE = new EmailClient();
    }

    return EmailClient.#INSTANCE;
  }

  static handleResponse(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  }

  sendMail(mail_object) {
    this.transporter.sendMail(mail_object, EmailClient.handleResponse);
  }

  sendNewPassword(user_email, password) {
    const mail_object = {
      from: "dont-reply-tsm@gmail.com",
      to: user_email,
      subject: "New Password on Stock API",
      text: `Your new password ${password} as requested for this e-mail`,
      html: `<p>Your new password <strong>${password}</strong> as requested for this e-mail</p>`,
    };

    this.sendMail(mail_object);
  }
}
