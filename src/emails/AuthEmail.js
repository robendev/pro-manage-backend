import "dotenv/config"
import { transport } from "../config/nodemailer.js"

export class AuthEmail {
    static sendConfirmationEmail = async({username, email, otpToken6Digits}) => {
        const mailOptions = {
            from: 'tu-correo@gmail.com',
            to: email,
            subject: 'Confirma tu cuenta',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                  <h1 style="color: #333333;">Bienvenido/a, ${username}</h1>
                  <p style="color: #666666;">Gracias por registrarte en nuestro servicio. Para completar tu registro, por favor ingresa el siguiente código de verificación en la ventana de confirmación:</p>
                  <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otpToken6Digits}</p>
                  <p style="color: #666666;">Este código expirará en 10 minutos. Si no has creado una cuenta en nuestro servicio, puedes ignorar este correo.</p>
                  <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Ir a la ventana de confirmación</a>
                  <p style="color: #666666;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                  <p style="color: #666666;">Atentamente,<br>El equipo de [Nombre de tu empresa]</p>
                </div>
              </div>
            `,
        };

        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Correo enviado: ' + info.response);
        } catch (error) {
            console.log(error);
        }
    }
    static sendNewVerificationEmail = async ({ username, email, otpToken6Digits }) => {
        const mailOptions = {
            from: 'tu-correo@gmail.com',
            to: email,
            subject: 'Confirma tu cuenta',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                  <h1 style="color: #333333;">Hola, ${username}</h1>
                  <p style="color: #666666;">Hemos notado que intentaste iniciar sesión, pero aún no has confirmado tu cuenta. Por favor, ingresa el siguiente código de verificación en la ventana de confirmación:</p>
                  <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otpToken6Digits}</p>
                  <p style="color: #666666;">Este código expirará en 10 minutos. Si no has solicitado este código, puedes ignorar este correo.</p>
                  <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Ir a la ventana de confirmación</a>
                  <p style="color: #666666; margin-top: 20px;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                  <p style="color: #666666;">Atentamente,<br>El equipo de [Nombre de tu empresa]</p>
                </div>
              </div>
            `,
        };

        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Correo enviado: ' + info.response);
        } catch (error) {
            console.error('Error al enviar el correo de confirmación:', error);
        }
    }
    static sendManualVerificationEmail = async ({ username, email, otpToken6Digits }) => {
        const mailOptions = {
            from: 'tu-correo@gmail.com',
            to: email,
            subject: 'Nuevo código de verificación',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                  <h1 style="color: #333333;">Hola, ${username}</h1>
                  <p style="color: #666666;">Hemos recibido una solicitud para generar un nuevo código de verificación para tu cuenta. Por favor, ingresa el siguiente código en la ventana de confirmación:</p>
                  <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otpToken6Digits}</p>
                  <p style="color: #666666;">Este código expirará en 10 minutos. Si no has solicitado este código, puedes ignorar este correo.</p>
                  <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Ir a la ventana de confirmación</a>
                  <p style="color: #666666; margin-top: 20px;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                  <p style="color: #666666;">Atentamente,<br>El equipo de [Nombre de tu empresa]</p>
                </div>
              </div>
            `,
        };

        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Correo enviado: ' + info.response);
        } catch (error) {
            console.error('Error al enviar el correo de confirmación:', error);
        }
    }
    static sendRecoveryVerificationEmail = async ({ username, email, otpToken6Digits }) => {
        const mailOptions = {
            from: 'tu-correo@gmail.com',
            to: email,
            subject: 'Recuperación de cuenta - Nuevo código de verificación',
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
                  <h1 style="color: #333333;">Hola, ${username}</h1>
                  <p style="color: #666666;">Hemos recibido una solicitud para recuperar tu cuenta. Por favor, ingresa el siguiente código de verificación en la ventana de confirmación:</p>
                  <p style="font-size: 24px; font-weight: bold; color: #007bff;">${otpToken6Digits}</p>
                  <p style="color: #666666;">Este código expirará en 10 minutos. Si no has solicitado este código, puedes ignorar este correo.</p>
                  <a href="${process.env.FRONTEND_URL}/auth/recover-account" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">Ir a la ventana de confirmación</a>
                  <p style="color: #666666; margin-top: 20px;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                  <p style="color: #666666;">Atentamente,<br>El equipo de [Nombre de tu empresa]</p>
                </div>
              </div>
            `,
        };

        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Correo enviado: ' + info.response);
        } catch (error) {
            console.error('Error al enviar el correo de confirmación:', error);
        }
    }
}