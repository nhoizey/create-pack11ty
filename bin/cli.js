#!/usr/bin/env node

const currentNodeVersion = process.versions.node;
const majorNodeVersion = currentNodeVersion.split(".")[0];

if (majorNodeVersion < 16) {
  console.error(`You are running Node ${currentNodeVersion}.
"create pack11ty" requires Node 18 or higher.
Please update your version of Node.`);
  process.exit(1);
}

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/nhoizey/pack11ty ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log(
  "Congratulations! You are ready. Follow the following commands to start"
);
console.log(`cd ${repoName} && npm start`);
