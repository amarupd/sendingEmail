// sendEmails.js
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();


// ---------- CONFIG ---------- //
// Replace with your actual details
const YOUR_EMAIL = process.env.YOUR_EMAIL;     // your email
const YOUR_APP_PASSWORD = process.env.YOUR_APP_PASSWORD // App Password (not Gmail password)
const RESUME_PATH = "./Amar_Dutt_Upadhyay_3YOE_NodeJS.pdf";            // path to your resume
const EMAIL_SUBJECT = "Application for Nodejs developer – Resume Attached";
const EMAIL_BODY =
`Dear HR,

I hope this message finds you well.

I am writing to express my interest in a Nodejs Developer opportunity at your organization. With over 3 years and 2 months of experience building scalable and high-performance web applications, I specialize in Node.js, Express.js, React.js, MySQL, MongoDB, Redis, and Socket.IO.

In my current role at Masterwiz Technologies Pvt. Ltd., I have led full-cycle development—from database design and backend architecture to dynamic frontend interfaces—for several production-grade platforms:

🔹 MyMaster11 – A fantasy sports platform (Dream11-like) where I built RESTful APIs, real-time leaderboard updates with Socket.IO, integrated Redis caching, and implemented contest workflows with RabbitMQ. I also contributed to the admin dashboard using React.js for real-time data monitoring and control.

🔹 Sportswiz – A real-time sports score and news platform built with Node.js, MySQL, React.js, and Redis, delivering live commentary and score updates with millisecond latency, optimized for thousands of concurrent users.

🔹 Opinion Trading – An opinion-based trading app where I implemented second-wise real-time updates using Socket.IO and developed both backend transaction processing and frontend UI components in React.js for a seamless trading experience.

🔹 MyMaster11 SportsBuy – An e-commerce platform for sports merchandise where I developed both the backend and the frontend (React.js) including product listings, payment gateway integration, admin features, and S3-based image management.

I take pride in writing clean, efficient code and building systems that are fast, scalable, and user-centric. I am well-versed in JWT authentication, microservices, CI/CD, cloud deployment (AWS), and modern frontend practices with React Hooks, Context API, Redux, and TailwindCSS.

Please find my resume attached for your review. I would welcome the opportunity to discuss how my skills and experience align with your team’s goals.

Thank you for your time and consideration.

Best regards,
Amar Dutt Upadhyay
📞 +91${process.env.YOUR_MOBILE}
📧 ${process.env.YOUR_EMAIL}
LinkedIn: ${process.env.LinkedIn}
GitHub: ${process.env.GitHub}
Portfolio: ${process.env.Portfolio}
`;

// ---------- READ EMAILS FROM JSON ---------- //
// Example JSON: { "emails": ["hr1@example.com", "hr2@example.com"] }
const emailsData = JSON.parse(fs.readFileSync("emails.json", "utf8"));
const emailList = emailsData.emails;

// ---------- SETUP MAILER (works with Gmail/Outlook/Zoho etc.) ---------- //
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // change if using Outlook, Zoho, etc.
  port: 465,
  secure: true,
  auth: {
    user: YOUR_EMAIL,
    pass: YOUR_APP_PASSWORD,
  },
});

// ---------- HELPER: wait function ---------- //
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------- SEND EMAILS ONE BY ONE WITH DELAY ---------- //
async function sendEmails() {
  for (let email of emailList) {
    try {
      let info = await transporter.sendMail({
        from: `"Amar Dutt Upadhyay" <${YOUR_EMAIL}>`,
        to: email,
        subject: EMAIL_SUBJECT,
        text: EMAIL_BODY,
        attachments: [
          {
            filename: "Amar_Dutt_Upadhyay_3YOE_NodeJS.pdf",
            path: RESUME_PATH,
          },
        ],
      });

      console.log(`✅ Sent to ${email} | Message ID: ${info.messageId}`);

      // Delay 5 seconds before sending next email
      await wait(5000);

    } catch (err) {
      console.error(`❌ Failed for ${email}:`, err.message);
    }
  }
}

sendEmails();
