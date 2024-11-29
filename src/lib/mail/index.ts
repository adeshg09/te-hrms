import nodemailer from "nodemailer";

export const generateResetPasswordMail = async (
  email: string,
  resetLink: string
) => {
  try {
    console.log("email", email, "resetlink", resetLink);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
                <h1>Password Reset Request</h1>
                <p>Please click on the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you didn't request this, please ignore this email.</p>
            `,
      text: `Please click on the link to reset your password: ${resetLink}`,
    });

    return { success: true, info }; 
  } catch (error) {
    console.error("Error sending reset password email:", error);
    return { error: "Failed to send reset password email" }; 
}
}
