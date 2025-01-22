const express = require('express');
import {Request, Response} from "express";
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

interface FormData {
  name: string;
  fone: string;
  email: string;
  subject: string;
  message: string;
}

app.post("/send-email", async (req: Request, res: Response) => {
  const { name, fone, email, subject, message } = req.body as FormData;

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `${subject} - Enviado por ${name}, atende por telefone ${fone}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("E-mail enviado com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocorreu um erro ao enviar o e-mail.");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});