const generateOtpToken6Digits = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export default generateOtpToken6Digits;
