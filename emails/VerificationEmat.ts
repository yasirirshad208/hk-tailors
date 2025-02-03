interface VerificationEmailProps {
    name: string;
    otp: string;
  }
  
  export default function generateVerificationEmail({ name, otp }: VerificationEmailProps): string {
    return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
        body {
          font-family: 'Roboto', Verdana, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
          color: #333;
        }
        .email-container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        h2 {
          color: #f97316;
        }
        .verification-code {
          font-size: 24px;
          font-weight: bold;
          color: #f97316;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <h2>Hello ${name},</h2>
        <p>Please use the following verification code to complete your verification:</p>
        <p class="verification-code">${otp}</p>
        <p>If you did not request this code, please ignore this email.</p>
        <p>Thank you!</p>
      </div>
    </body>
  </html>
    `;
  }
  