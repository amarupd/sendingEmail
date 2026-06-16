const fs = require("fs");

// Read JSON file
const data = JSON.parse(fs.readFileSync("newEmails.json", "utf8"));

const counts = new Map();

for (const email of data.emails) {
  const normalized = email.trim().toLowerCase();
  counts.set(normalized, (counts.get(normalized) || 0) + 1);
}

// Unique emails
const uniqueEmails = [...counts.keys()];

// Duplicate statistics
const duplicateEmails = [...counts.entries()]
  .filter(([_, count]) => count > 1)
  .map(([email, count]) => ({
    email,
    occurrences: count,
    duplicates: count - 1,
  }));

const totalDuplicates = duplicateEmails.reduce(
  (sum, item) => sum + item.duplicates,
  0
);

// Save unique emails
fs.writeFileSync(
  "emails_unique.json",
  JSON.stringify({ emails: uniqueEmails }, null, 2)
);

console.log("Total emails:", data.emails.length);
console.log("Unique emails:", uniqueEmails.length);
console.log("Duplicate entries:", totalDuplicates);
console.log("Duplicate email addresses:", duplicateEmails.length);

if (duplicateEmails.length) {
  console.log("\nDuplicate Details:");
  console.table(duplicateEmails);
}