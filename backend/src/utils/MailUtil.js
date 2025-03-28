const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Create transporter using environment variables for credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
    pass: process.env.EMAIL_PASS, // your email password
  },
});

/**
 * Sends an email.
 * @param {string} to - Receiver's email address.
 * @param {string} subject - Email subject.
 * @param {string} htmlContent - HTML content of the email.
 */
const sendingMail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Travel Diary" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to} with subject: ${subject}`);
  } catch (error) {
    console.error("❌ Email sending error:", error);
  }
};

/**
 * Generates the HTML content for the Welcome email.
 * @param {string} name - The user's name.
 * @returns {string} HTML content.
 */
const welcomeMailContent = (name) => `
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" 
           style="border-collapse:collapse; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      <tr>
        <td align="center" style="padding:20px 0; background:linear-gradient(135deg, #6a1b9a, #ff4081);">
          <h2 style="color:#ffffff; margin:0;">Welcome to Travel Diary!</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:20px; text-align:center; color:#333333;">
          <p style="font-size:16px; line-height:1.5;">Dear ${name},</p>
          <p style="font-size:16px; line-height:1.5;">Thank you for joining Travel Diary – the ultimate platform to share and preserve your travel memories.</p>
          <p style="font-size:16px; line-height:1.5;">Click the button below to start exploring your travel diary.</p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0;">
            <tr>
              <td align="center">
                <a href="https://yourdomain.com/explore" style="font-size:16px; font-weight:bold; text-decoration:none; background-color:#6a1b9a; color:#ffffff; padding:12px 20px; border-radius:5px; display:inline-block;">Explore Now</a>
              </td>
            </tr>
          </table>
          <p style="font-size:16px; line-height:1.5;">Thank you for joining us!</p>
          <p style="font-size:16px; line-height:1.5;">Best regards,<br><strong>Travel Diary Team</strong></p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

/**
 * Generates the HTML content for the Reset Password email.
 * @param {string} name - The user's name.
 * @param {string} resetLink - The password reset URL.
 * @returns {string} HTML content.
 */
const resetPasswordMailContent = (name, resetLink) => `
<html>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif; text-align:center;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" 
           style="border-collapse:collapse; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
      <tr>
        <td align="center" style="padding:20px 0; background:linear-gradient(135deg, #6a1b9a, #ff4081);">
          <h2 style="color:#ffffff; margin:0;">Reset Your Password</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:20px; text-align:center; color:#333333;">
          <p style="font-size:16px; line-height:1.5;">Hi ${name || 'User'},</p>
          <p style="font-size:16px; line-height:1.5;">We received a request to reset your password for your Travel Diary account.</p>
          <p style="font-size:16px; line-height:1.5;">Click the button below to reset your password. This link will expire in 1 hour.</p>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0;">
            <tr>
              <td align="center">
                <a href="${resetLink}" target="_blank" style="font-size:16px; font-weight:bold; text-decoration:none; background-color:#6a1b9a; color:#ffffff; padding:12px 20px; border-radius:5px; display:inline-block;">Reset Password</a>
              </td>
            </tr>
          </table>
          <p style="font-size:16px; line-height:1.5;">If you didn't request a password reset, please ignore this email.</p>
          <p style="font-size:16px; line-height:1.5;">Best regards,<br><strong>Travel Diary Team</strong></p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = { sendingMail, welcomeMailContent, resetPasswordMailContent };
