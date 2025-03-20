const { execSync } = require("child_process");
const { version } = require("../package.json");
const fs = require("fs");

try {
  // run update based on package.json version
  execSync(
    `bubblewrap update --appVersionName=${version} --manifest=twa-manifest.json`,
    { stdio: "inherit" }
  );

  // replace gradle.properties as said
  const gradlePropertiesPath = "gradle.properties";
  let gradleProperties = fs.readFileSync(gradlePropertiesPath, "utf8");
  gradleProperties = gradleProperties.replace("-Xmx1536m", "-Xmx1024M");
  fs.writeFileSync(gradlePropertiesPath, gradleProperties);

  // run build after it
  execSync(`bubblewrap build`, { stdio: "inherit" });
} catch (error) {
  console.error("Failed to run Bubblewrap update and build:", error.message);
  process.exit(1);
}
