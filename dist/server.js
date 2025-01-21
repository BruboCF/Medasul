"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = parseInt(process.env.PORT || "3000", 10);
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, fone, email, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 465,
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
        yield transporter.sendMail(mailOptions);
        res.send("E-mail enviado com sucesso!");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Ocorreu um erro ao enviar o e-mail.");
    }
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
