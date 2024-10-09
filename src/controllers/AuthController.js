import User from "../models/User.js";
import OtpToken from "../models/OtpToken.js";
import CustomError from "../errors/CustomErrors.js";
import generateOtpToken6Digits from "../utils/otpToken.js";
import generateJsonWebToken from "../utils/jsonwebtoken.js";
import { sendConfirmationEmailAsync, 
  sendManualVerificationEmailAsync, 
  sendNewVerificationEmailAsync, 
  sendRecoveryVerificationEmailAsync } from "../emails/AuthEmailAsync.js";

export class AuthController {
  static createAccount = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      const isUserPresent = await User.findOne({ email });
      if (isUserPresent) {
        throw new CustomError(
          "No se pudo crear la cuenta. Por favor, inténtalo de nuevo.",
          409
        );
      }
      const user = new User({
        username,
        email,
        password,
      });
      const otpToken = new OtpToken({
        otpToken6Digits: generateOtpToken6Digits(),
        userId: user._id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await Promise.allSettled([user.save(), otpToken.save()]);
      sendConfirmationEmailAsync({username, email, otpToken6Digits: otpToken.otpToken6Digits})
      res.status(201).json({ message: 'Usuario registrado. Por favor, confirma tu cuenta.' });
    } catch (err) {
      next(err);
    }
  };
  static confirmAccount = async (req, res, next) => {
    const { otpToken6Digits } = req.body;
    try {
      const isOtpToken6DigitsPresent = await OtpToken.findOne({
        otpToken6Digits,
      });
      if (!isOtpToken6DigitsPresent) {
        throw new CustomError(
          "No se pudo confirmar la cuenta. Verifica tu información.",
          400
        );
      }
      const isUserPresent = await User.findById(
        isOtpToken6DigitsPresent.userId
      );
      if (!isUserPresent) {
        throw new CustomError(
          "No se pudo confirmar la cuenta. Verifica tu información.",
          404
        );
      }
      isUserPresent.isActive = true;
      await Promise.allSettled([
        isUserPresent.save(),
        isOtpToken6DigitsPresent.deleteOne(),
      ]);
      res.json({ message: "Cuenta confirmada exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static loginAccount = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const isUserPresent = await User.findOne({
        $and: [{ email }],
      });
      if (!isUserPresent) {
        throw new CustomError(
          "No se pudo iniciar sesión. Verifica tus credenciales.",
          401
        );
      }
      if (!isUserPresent.isActive) {
        const currentOtpToken6Digits = await OtpToken.findOne({userId: isUserPresent._id})
        if (currentOtpToken6Digits) {
          throw new CustomError("Ya tienes un token de verificación activo. Por favor, utilízalo para confirmar tu cuenta.", 409)
        }
        const otpToken = new OtpToken({
          otpToken6Digits: generateOtpToken6Digits(),
          userId: isUserPresent._id,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        })
        await otpToken.save();
        sendNewVerificationEmailAsync({
          username: isUserPresent.username, 
          email: isUserPresent.email, otpToken6Digits: 
          otpToken.otpToken6Digits
        })
        throw new CustomError("Tu cuenta aún no ha sido confirmada. Se ha enviado un nuevo token de verificación a tu correo electrónico.", 403)
      }
      const isPasswordCorrect = await isUserPresent.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new CustomError(
          "No se pudo iniciar sesión. Verifica tus credenciales.",
          401
        );
      }
      const payload = {
        _id: isUserPresent._id,
        username: isUserPresent.username,
        email: isUserPresent.email,
      };
      const tokenJwt = generateJsonWebToken(payload);
      res.json({ message: "Inicio de sesión exitoso.", tokenJwt });
    } catch (err) {
      next(err);
    }
  };
  static requestNewOtpToken6Digits = async (req, res, next) => {
    const { email } = req.body;
    try {
      const isUserPresent = await User.findOne({
        $and: [{ email }],
      });
      if (!isUserPresent) {
        throw new CustomError("No se encontró ninguna cuenta con ese correo electrónico.", 404);
      }
      if (isUserPresent.isActive) {
        throw new CustomError("Tu cuenta se encuentra activa, si no puedes iniciar sesión intenta recuperar tu cuenta", 409)
      }
      const currentOtpToken6Digits = await OtpToken.findOne({
        userId: isUserPresent._id,
      });
      if (currentOtpToken6Digits) {
        throw new CustomError("Ya tienes un token de verificación activo. Por favor, utilízalo para confirmar tu cuenta.", 409);
      }
      const otpToken = new OtpToken({
        otpToken6Digits: generateOtpToken6Digits(),
        userId: isUserPresent._id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await otpToken.save();
      sendManualVerificationEmailAsync({
        username: isUserPresent.username,
        email: isUserPresent.email,
        otpToken6Digits: otpToken.otpToken6Digits
      })      
      res.json({ message: "Se ha generado un nuevo token de verificación y se ha enviado a tu correo electrónico." });
    } catch (err) {
      next(err);
    }
  };
  static recoverAccount = async (req, res, next) => {
    const { email } = req.body;
    try {
      const isUserPresent = await User.findOne({ email });
      if (!isUserPresent) {
        throw new CustomError("No se encontró ninguna cuenta con ese correo electrónico.", 404);
      }
      const currentOtpToken6Digits = await OtpToken.findOne({
        userId: isUserPresent._id,
      });
      if (currentOtpToken6Digits) {
        throw new CustomError("Ya tienes un token de verificación activo. Por favor, utilízalo para confirmar tu cuenta.", 409);
      }
      const otpToken = new OtpToken({
        otpToken6Digits: generateOtpToken6Digits(),
        userId: isUserPresent._id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });
      await otpToken.save();
      sendRecoveryVerificationEmailAsync
      ({
        username: isUserPresent.username,
        email: isUserPresent.email,
        otpToken6Digits: otpToken.otpToken6Digits,
    });
      res.json({ message: "Se ha generado un nuevo token de verificación y se ha enviado a tu correo electrónico." });
    } catch (err) {
      next(err);
    }
  };
  static validateOtpTokenForPasswordReset = async (req, res, next) => {
    const { otpToken6Digits } = req.body;
    try {
      const isOtpToken6DigitsPresent = await OtpToken.findOne({
        otpToken6Digits,
      });
      if (!isOtpToken6DigitsPresent) {
        throw new CustomError(
          "No se pudo validar el token. Por favor, inténtalo de nuevo.",
          400
        );
      }
      res.json({
        message: "Token válido. Puedes proceder a modificar tu contraseña.",
      });
    } catch (err) {
      next(err);
    }
  };
  static resetPassword = async (req, res, next) => {
    const { otpToken6Digits } = req.params;
    const { password } = req.body;
    try {
      const isOtpToken6DigitsPresent = await OtpToken.findOne({
        otpToken6Digits,
      });
      if (!isOtpToken6DigitsPresent) {
        throw new CustomError(
          "No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo.",
          400
        );
      }
      const isUserPresent = await User.findById(
        isOtpToken6DigitsPresent.userId
      );
      if (!isUserPresent) {
        throw new CustomError(
          "No se pudo restablecer la contraseña. Por favor, inténtalo de nuevo.",
          400
        );
      }
      isUserPresent.password = password;
      await Promise.allSettled([
        isUserPresent.save(),
        isOtpToken6DigitsPresent.deleteOne(),
      ]);
      res.json({ message: "Contraseña modificada exitosamente." });
    } catch (err) {
      next(err);
    }
  };
  static validateUser = async (req, res, next) => {
    try {
      return res.json(req.user)
    } catch (err) {
      next(err);
    }
  };
}
