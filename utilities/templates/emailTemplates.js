const baseTemplate = (content) => `
  <div style="background-color:#f4f6f8;padding:40px 0;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;padding:30px;">
      
      <div style="text-align:center;margin-bottom:25px;">
        <h2 style="color:#1e3a8a;margin:0;">Innovation Club 🚀</h2>
      </div>

      ${content}

      <div style="margin-top:30px;text-align:center;font-size:12px;color:#6b7280;">
        <p>© ${new Date().getFullYear()} Innovation Club</p>
      </div>

    </div>
  </div>
`;

// ✅ THEN use it in exports
export const applicationReceived = (name) =>
  baseTemplate(`
    <h1 style="color:#111827;">Thank You, ${name}! 🎉</h1>
    <p style="color:#374151;font-size:16px;">
      We’ve received your application.
    </p>
  `);

export const accepted = (name) =>
  baseTemplate(`
    <h1 style="color:#16a34a;">Welcome, ${name}! 🎉</h1>
    <p style="color:#374151;font-size:16px;">
      You are now officially a member of the Innovation Club.
    </p>
  `);

export const rejected = (name) =>
  baseTemplate(`
    <h1 style="color:#dc2626;">Hello, ${name}</h1>
    <p style="color:#374151;font-size:16px;">
      We cannot accept your application at this time.
    </p>
  `);

export const massUpdate = (message) =>
  baseTemplate(`
    <h1 style="color:#1e40af;">Club Announcement 📢</h1>
    <p style="color:#374151;font-size:16px;">
      ${message}
    </p>
  `);

export const meetingInvite = (name, date) =>
  baseTemplate(`
    <h1 style="color:#7c3aed;">Meeting Invitation 🗓</h1>
    <p style="color:#374151;font-size:16px;">
      Hi ${name},
    </p>
    <p style="color:#374151;font-size:16px;">
      You’re invited on <strong>${date}</strong>.
    </p>
  `);