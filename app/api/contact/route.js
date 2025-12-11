import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, phone, budget, project, industry, message } = await req.json();

    // 1️⃣ Create a transporter (uses your Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your app password (not your normal password)
      },
    });

    // 2️⃣ Define the email details
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to:  process.env.EMAIL_RECIEVER, // recipient (where you want to receive the form)
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Project Type:</strong> ${project}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
