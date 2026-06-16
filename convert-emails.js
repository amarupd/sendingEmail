const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "emails.txt");
const outputFile = path.join(__dirname, "newEmails.json");
const ignoredFile = path.join(__dirname, "ignoredEmails.json");

try {
  const content = fs.readFileSync(inputFile, "utf8");

  // Split by whitespace, comma, semicolon, newline, tab
  const tokens = content
    .split(/[\s,;]+/)
    .map(item => item.trim())
    .filter(Boolean);

  const validEmailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const validEmails = [];
  const ignoredEmails = [];

  for (const token of tokens) {
    // Only inspect things containing @
    if (token.includes("@")) {
      if (validEmailRegex.test(token)) {
        validEmails.push(token);
      } else {
        ignoredEmails.push(token);
      }
    }
  }

  const uniqueValidEmails = [...new Set(validEmails)];
  const uniqueIgnoredEmails = [...new Set(ignoredEmails)];

  fs.writeFileSync(
    outputFile,
    JSON.stringify(
      {
        emails: uniqueValidEmails,
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    ignoredFile,
    JSON.stringify(
      {
        ignoredEmails: uniqueIgnoredEmails,
      },
      null,
      2
    )
  );

  console.log("==================================");
  console.log(`✅ Valid Emails   : ${uniqueValidEmails.length}`);
  console.log(`❌ Ignored Emails : ${uniqueIgnoredEmails.length}`);
  console.log("==================================");

  if (uniqueIgnoredEmails.length) {
    console.log("\nIgnored Emails:");
    uniqueIgnoredEmails.forEach(email => {
      console.log(` - ${email}`);
    });
  }
} catch (error) {
  console.error("Error:", error.message);
}