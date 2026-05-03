const fs = require("fs");
const path = require("path");

const versionData = {
  sha: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  branch: process.env.VERCEL_GIT_COMMIT_REF || "vivuser/vivart",
  deployedAt: new Date().toISOString(),
};

const outputPath = path.join(__dirname, "../public/version.json");

fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2));

console.log("✅ version.json generated:", versionData);