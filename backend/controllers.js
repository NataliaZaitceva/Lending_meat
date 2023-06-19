const Message = require('./model')
const nodemailer = require('nodemailer');

module.exports.createMessage = (req, res, next) => {
  const { subject, name, number, message} = req.body;
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'tacamarade@gmail.com',
      pass: 'kgzobdlrkbhsstfa'
    }
  });

  const mailOptions = {
    from: name,
    to: 'tacamarade@gmail.com',
    subject: subject,
    text:`${name} написал(а): ${message}. Перезвонить по номеру: ${number}`
  };

 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ошибка отправки сообщения!');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Сообщение отправлено!');
    }
  })

};
  
   
  