// deploy.js
const { execSync } = require("child_process");

const args = process.argv.slice(2);
let message = "";
let branch = "";

// Parse args dạng: --msg "abc" hoặc --msg=abc
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--msg" && args[i + 1]) {
    message = args[i + 1];
    i++;
  } else if (args[i].startsWith("--msg=")) {
    message = args[i].split("=")[1];
  } else if (args[i] === "--br" && args[i + 1]) {
    branch = args[i + 1];
    i++;
  } else if (args[i].startsWith("--br=")) {
    branch = args[i].split("=")[1];
  }
}

if (!message) {
  console.error(
    '❌ lack of commit message, try: node deploy.cjs -- --msg "message" [--br branch]',
  );
  process.exit(1);
}

// Nếu không có branch thì lấy branch hiện tại
if (!branch) {
  branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

console.log(`📦 Commit message: "${message}"`);
console.log(`🌿 Branch: ${branch}`);

try {
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "${message}"`, { stdio: "inherit" });
  execSync(`git push origin ${branch}`, { stdio: "inherit" });
  console.log("✅ successfully push to git");
} catch (error) {
  console.error("❌ error when excuting:", error.message);
  process.exit(1);
}
