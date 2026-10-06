import nodemailer from "nodemailer";

export function getSmtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    return null;
  }

  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number");
  }

  return {
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    from: SMTP_FROM,
  };
}

export async function sendPasswordResetEmail(email, token) {
  const config = getSmtpConfig();
  if (!config) {
    const error = new Error("Password reset email is not configured");
    error.code = "SMTP_NOT_CONFIGURED";
    throw error;
  }

  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  const resetUrl = new URL("/reset-password", clientUrl);
  resetUrl.searchParams.set("token", token);
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: config.from,
    to: email,
    subject: "Reset your Noor & Bloom password",
    text: `Use this link to choose a new password. It expires in 30 minutes:\n\n${resetUrl.href}\n\nIf you did not request a password reset, you can ignore this email.`,
    html: `<p>Use the link below to choose a new password. It expires in 30 minutes.</p><p><a href="${resetUrl.href}">Reset your password</a></p><p>If you did not request a password reset, you can ignore this email.</p>`,
  });
}
