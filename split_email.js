const fs = require("fs");
const path = require("path");

const CHUNK_SIZE = 400;

// Read source file
const data = JSON.parse(
  fs.readFileSync("storeEmails.json", "utf8")
);

const emails = data.emails;

// Create output directory
const outputDir = "./email_chunks";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

let fileCount = 0;

for (let i = 0; i < emails.length; i += CHUNK_SIZE) {
  const chunk = emails.slice(i, i + CHUNK_SIZE);

  fileCount++;

  const fileName = `emails_part_${fileCount}.json`;

  fs.writeFileSync(
    path.join(outputDir, fileName),
    JSON.stringify(
      {
        emails: chunk,
      },
      null,
      2
    )
  );

  console.log(
    `Created ${fileName} with ${chunk.length} emails`
  );
}

console.log(`\nTotal files created: ${fileCount}`);
console.log(`Total emails processed: ${emails.length}`);