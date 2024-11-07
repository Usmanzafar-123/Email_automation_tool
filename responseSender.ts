import nodemailer from 'nodemailer';

export async function sendResponseEmail(email: string, label: string): Promise<void> {
  // Create a transport object for sending emails using Gmail SMTP server
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail email address
      pass: process.env.EMAIL_PASS, // Your Gmail email password (or app-specific password)
    },
  });

  // Define the message content based on the email label
  let message: string;

  if (label === 'Interested') {
    message = 'Thanks for your interest! Are you available for a demo call?';
  } else if (label === 'More Information') {
    message = 'Could you please specify what information you’d like to know more about?';
  } else {
    message = 'Thank you for your time.';
  }

  // Send the email
  await transport.sendMail({
    from: process.env.EMAIL_USER, // From your email address
    to: email, // To the recipient's email address
    subject: 'Re: Your Inquiry', // Subject of the email
    text: message, // Body content of the email
  });
}
