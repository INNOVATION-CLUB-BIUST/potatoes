class SMSService {
  async sendSMS({ phoneNumbers, message }) {
    const response = await fetch(process.env.MASCOM_SMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id: process.env.MASCOM_SMS_SENDER_ID,
        country_code: process.env.MASCOM_COUNTRY_CODE,
        phone_numbers: phoneNumbers,
        message,
        api_key: process.env.MASCOM_SMS_API_KEY,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(JSON.stringify(data));
    }

    return data;
  }
}

export default new SMSService();