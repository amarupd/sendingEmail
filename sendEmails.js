// sendEmails.js
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();


// ---------- CONFIG ---------- //
// Replace with your actual details
const YOUR_EMAIL = process.env.YOUR_EMAIL;     // your email
const YOUR_APP_PASSWORD = process.env.YOUR_APP_PASSWORD // App Password (not Gmail password)
const RESUME_PATH = "./Amar_Dutt_Upadhyay_4YOE_FSD_JS.pdf";            // path to your resume
const EMAIL_SUBJECT = "Application for Full Stack / Node.js Developer Opportunity";
const EMAIL_BODY =
  `Dear HR,

I hope you are doing well.

I am writing to express my interest in a Full Stack / Node.js Developer opportunity at your organization. I have 4+ years of hands-on experience building scalable, high-performance web applications using Node.js, Nest.js, React.js, Next.js, MySQL, MongoDB, Redis, RabbitMQ, and Socket.IO.

Currently, I am working as a Software Development Engineer at Masterwiz Technologies Pvt. Ltd., where I have been actively involved in designing and developing production-grade applications with a strong focus on scalability, performance optimization, and real-time systems.

Some of the key projects I have worked on include:

🔹 MyMaster11
A fantasy sports platform similar to Dream11, where I developed scalable REST APIs, real-time leaderboard systems using Socket.IO, Redis caching, contest management workflows, and background job processing with RabbitMQ. I also contributed to frontend modules and admin dashboards using React.js.

🔹 Sportswiz
A live cricket score and sports information platform delivering real-time scores, commentary, schedules, and player statistics. Built using Node.js, Nest.js, MySQL, Redis, RabbitMQ, and Socket.IO to support thousands of concurrent users with low-latency updates.

🔹 Opinion Trading Platform
Developed a real-time opinion trading application with second-wise live price fluctuations using Socket.IO. Worked on backend architecture, transaction handling, Redis optimization, RabbitMQ queues, and interactive frontend interfaces for seamless user experience.

🔹 Sportswiz Ecommerce Platform
Built a complete ecommerce platform for sports merchandise, including backend APIs, admin dashboard, product management, inventory tracking, and frontend ecommerce experience using React.js and Next.js. Integrated Redis caching and AWS S3 for optimized performance and scalable media handling.

I am passionate about building efficient, scalable, and user-focused applications. My expertise includes REST APIs, microservices architecture, JWT authentication, AWS deployment, Redis optimization, Docker, CI/CD pipelines, and modern frontend development practices.

Portfolio: ${process.env.Portfolio}
LinkedIn: ${process.env.LinkedIn}
GitHub: ${process.env.GitHub}
Ptojects: ${process.env.Projects}

Please find my resume attached for your consideration. I would welcome the opportunity to discuss how my skills and experience can contribute to your team.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
Amar Dutt Upadhyay
📞 +91${process.env.YOUR_MOBILE}
📧 ${process.env.YOUR_EMAIL}
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
            filename: "Amar_Dutt_Upadhyay_4YOE_FSD_JS.pdf",
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
