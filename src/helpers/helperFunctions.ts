const nodemailer = require("nodemailer");
const helperFunctions = {
  generateRandom4DigitNumber: () => {
    // Generate a random number between 1000 and 9999
    const random4DigitNumber = Math.floor(Math.random() * 9000) + 1000;
    return random4DigitNumber;
  },

  sendMail: (email: string, OTP: number) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.GOOGLE_APP_CODE,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verification Code - NODEPAY",
      text: `your otp is ${OTP}`,
    };

    transporter.sendMail(mailOptions, async (error: any, info: any) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    return transporter;
  },
};

export default helperFunctions;
