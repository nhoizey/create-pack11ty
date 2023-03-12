#!/usr/bin/env node

const chalk = require("chalk");
const packageJson = require("./package.json");

const currentNodeVersion = process.versions.node;
const majorNodeVersion = currentNodeVersion.split(".")[0];
const minimumNodeVersion = 16;

if (majorNodeVersion < minimumNodeVersion) {
  console.error(
    `You are running Node ${currentNodeVersion}.
${chalk.red(`"create pack11ty" requires Node ${minimumNodeVersion} or higher.`)}
Please update your version of Node.`
  );
  process.exit(1);
}

const { execSync } = require("child_process");

const folderName = process.argv[2];
if (folderName === undefined) {
  console.error(`
${chalk.red(`Error: you must specify the target folder name:`)}
npm create pack11ty@latest <my-project-folder>
`);
  process.exit(-1);
}

console.log(
  chalk.blue(`
Cloning the repository with name ${folderName}`)
);
const gitCheckoutCommand = `git clone --depth 1 https://github.com/nhoizey/pack11ty ${folderName}`;
try {
  execSync(`${gitCheckoutCommand}`, { stdio: "inherit" });
} catch (e) {
  console.error(
    chalk.red(
      `
Failed to check out pack11ty`,
      e
    )
  );
  process.exit(-1);
}

console.log(
  chalk.blue(`
Installing dependencies for ${folderName}`)
);
const installDepsCommand = `cd ${folderName} && npm install`;
try {
  execSync(`${installDepsCommand}`, { stdio: "inherit" });
} catch (e) {
  console.error(
    chalk.red(
      `
Failed to install dependencies`,
      e
    )
  );
  process.exit(-1);
}

console.log(
  `
${chalk.green(`Congratulations, you are ready!`)}

${chalk.blue(`Execute the following commands to start:`)}
cd ${folderName}
npm start`
);
