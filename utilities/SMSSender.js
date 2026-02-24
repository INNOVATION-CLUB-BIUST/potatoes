import SMSService from "./SMSService";
import * as templates from "./templates/smsTemplates";
import { logSMS } from "./smsLogger";

class SMSSender {
  async send({ type, recipients, data }) {

    const recipientList = Array.isArray(recipients)
      ? recipients
      : [recipients];

    let message;

    switch (type) {
      case "applicationReceived":
        message = templates.applicationReceived(data.name);
        break;

      case "accepted":
        message = templates.accepted(data.name);
        break;

      case "rejected":
        message = templates.rejected(data.name);
        break;

      case "massUpdate":
        message = templates.massUpdate(data.message);
        break;

      case "meetingInvite":
        message = templates.meetingInvite(data.name, data.date);
        break;

      default:
        throw new Error("Unknown SMS type");
    }

    const batchSize = 10;

    for (let i = 0; i < recipientList.length; i += batchSize) {

      const batch = recipientList.slice(i, i + batchSize);

      try {
        const response = await SMSService.sendSMS({
          phoneNumbers: batch,
          message,
        });

        logSMS({
          phoneNumbers: batch,
          message,
          status: "SUCCESS",
          response,
        });

      } catch (error) {
        logSMS({
          phoneNumbers: batch,
          message,
          status: "FAILED",
          response: error,
        });
      }
    }
  }
}

export default new SMSSender();