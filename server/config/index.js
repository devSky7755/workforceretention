module.exports = {
  MONGO_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/workforceretention",
  SECRET: "SUPER_SECRET",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
};
