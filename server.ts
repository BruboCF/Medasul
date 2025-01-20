const express = require('express');
import {Request, Response} from "express";
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Tipagem para os dados do formulário
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rota para envio de e-mail
app.post("/send-email", async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body as FormData;

  // Configurar transporte de e-mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configurar o e-mail a ser enviado
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `${subject} - Enviado por ${name}`,
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