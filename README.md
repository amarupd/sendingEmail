# Automate Email Sender

This project allows you to automatically send emails with attachments to multiple recipients using **Node.js**, **Nodemailer**, and environment variables for security.

---

## **Project Structure**

```
.
├── node_modules/
├── .env
├── .gitignore
├── Amar_Dutt_Upadhyay_3YOE_NodeJS.pdf
├── emails.json
├── package.json
├── package-lock.json
├── sendEmails.js
├── storeEmails.json
```

---

## **Features**

- Reads email addresses from a JSON file.
- Sends emails with a predefined subject, body, and PDF attachment.
- Uses **environment variables** for sensitive credentials.
- Configurable email content.
- Delay between each email to avoid spam detection.

---

## **Installation**

1. **Clone the repository**:
   ```bash
   git clone <repo_url>
   cd automate_email
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env` file in the root directory:

   ```env
   YOUR_APP_PASSWORD="xxxx xxxx xxxx xxxx"
   YOUR_EMAIL="your.email@gmail.com"
   ```

   **Note**: For Gmail, generate an **App Password** from your Google Account.

4. **Add recipients**:
   Update `emails.json` with email addresses:
   ```json
   {
     "emails": [
       "example1@gmail.com",
       "example2@gmail.com"
     ]
   }
   ```

5. **Add attachment**:
   Replace `Amar_Dutt_Upadhyay_3YOE_NodeJS.pdf` with your own file if needed.

---

## **Usage**

Run the script to send emails:

```bash
node sendEmails.js
```

The script will:
- Read all email addresses from `emails.json`.
- Send emails one by one with a 5-second delay.
- Attach the provided resume/PDF file.
- Log success or failure for each recipient.

---

## **Configuration**

**In `sendEmails.js`**, you can modify:

- **Email subject**:
  ```js
  const EMAIL_SUBJECT = "Application for Nodejs developer – Resume Attached";
  ```

- **Email body**:
  Edit the `EMAIL_BODY` string.

- **Attachment**:
  ```js
  const RESUME_PATH = "./Amar_Dutt_Upadhyay_3YOE_NodeJS.pdf";
  ```

- **SMTP settings**:
  Default is Gmail (`smtp.gmail.com`). Update if using Outlook, Zoho, etc.

---

## **Important Notes**

- **Do not commit `.env`** or sensitive files. Ensure `.gitignore` contains:
  ```
  node_modules
  .env
  ```
- Sending too many emails too quickly can trigger spam detection.
- Use verified app passwords and allow "less secure apps" if required.

---

## **Dependencies**

- [dotenv](https://www.npmjs.com/package/dotenv) – Load environment variables.
- [nodemailer](https://www.npmjs.com/package/nodemailer) – Send emails.
- [fs](https://nodejs.org/api/fs.html) – Read JSON files.

---

## **License**

ISC License

---

## **Author**

**Amar Dutt Upadhyay**  
[LinkedIn](https://www.linkedin.com/in/amar-upd/) | [GitHub](https://github.com/amarupd) | [Portfolio](https://www.amarduttupadhyay.in)
