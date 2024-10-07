import { AuthEmail } from "./AuthEmail.js";

export const sendConfirmationEmailAsync = async({username, email, otpToken6Digits}) => {
    try {
        await AuthEmail.sendConfirmationEmail({ username, email, otpToken6Digits });
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
}
export const sendNewVerificationEmailAsync = async({username, email, otpToken6Digits}) => {
    try {
        await AuthEmail.sendNewVerificationEmail({username, email, otpToken6Digits})
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
}
export const sendManualVerificationEmailAsync = async({username, email, otpToken6Digits}) => {
    try {
        await AuthEmail.sendManualVerificationEmail({username, email, otpToken6Digits})
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
}
export const sendRecoveryVerificationEmailAsync = async ({ username, email, otpToken6Digits }) => {
    try {
        await AuthEmail.sendRecoveryVerificationEmail({ username, email, otpToken6Digits });
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
};