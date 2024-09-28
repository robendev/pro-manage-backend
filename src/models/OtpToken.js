import mongoose from "mongoose";

const otpTokenSchema = new mongoose.Schema(
  {
    otpToken6Digits: {
      type: String,
    },
    userId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    isUsed: {
      default: false,
      type: Boolean,
    },
    expiresAt: {
      required: true,
      type: Date,
    },
  },
  { timestamps: true }
);

// Agregar índice TTL
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpToken = mongoose.model("OtpToken", otpTokenSchema);

export default OtpToken;
