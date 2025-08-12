import nodemailer from "nodemailer";

export const sendEmail = async ({to,subject , html ,text ,attachments}) => {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass:process.env.SENDER_PASSWORD , 
    },
    });

    const info = await transporter.sendMail({
    from: `"hello ✌❤😘" <${process.env.SENDER_EMAIL}>`,
    to: to || process.env.EMAIL_TEST,
    subject: subject||  "Hello ✔",
        text: text|| "good" ,
    html:html || "<b>Hello world?</b>",
        attachments : attachments ||[]
    });
    // console.log("📬 Email Info:", info);

    if (info.accepted.length>0) {
        return true
    } else {
        return false
    }
    
};
