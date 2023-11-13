
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.SMTP_USERNAME ,
      pass: process.env.SMTP_PASSWORD
    }
  }));

  export function sendEmail(receiver,subject,text){
    var mailOptions = {
        from: 'mohamedaziz.bourguiba@esprit.tn',
         to: receiver ,
         subject: subject,
         text: text
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
  }
