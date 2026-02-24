export const logSMS = ({ phoneNumbers, message, status, response }) => {
  console.log("SMS LOG:", {
    phoneNumbers,
    message,
    status,
    response,
    timestamp: new Date().toISOString(),
  });
};