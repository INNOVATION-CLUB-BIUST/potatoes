export const applicationReceived = (name) =>
  `Hi ${name}, we received your Innovation Club application!`;

export const accepted = (name) =>
  `Congrats ${name}! You're now a member of Innovation Club.`;

export const rejected = (name) =>
  `Hi ${name}, unfortunately your application was not successful this time.`;

export const massUpdate = (message) =>
  `Innovation Club Update: ${message}`;

export const meetingInvite = (name, date) =>
  `Hi ${name}, meeting scheduled on ${date}. See you there!`;