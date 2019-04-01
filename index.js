#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 *
 * Author: Gabriele Venturi (https://github.com/gventuri)
 * Contributors: Gianni Valdanbrini (https://github.com/gvaldambrini)
 * License: MIT
 */

const fs = require("fs");
const program = require("commander");

const DEFAULT_PATH = `src/components`;

const MISSING_COMPONENT_MSG = `Missing component name. You need to provide one to create a new component`;
const WRONG_PATH_MSG = `The path provided is wrong`;

class Commands {
  add(name, path) {
    if (!name) warnAndExit(MISSING_COMPONENT_MSG);

    if (!fs.existsSync(path)) warnAndExit(WRONG_PATH_MSG);

    try {
      fs.mkdirSync(`${path}/${name}/`, { recursive: true });
    } catch (err) {
      warnAndExit(`Cannot create the directory "${path}/${name}".`);
    }

    const templates = fs.readdirSync(__dirname + "/templates");
    for (let template of templates) createFile(template, name, path);
  }
}

const createFile = async (file, name, path) => {
  const fileName = file.replace("$name", name);

  if (fs.existsSync(`${path}/${name}/${fileName}`)) {
    console.log(`File "${fileName}" already exists, skipping.`);
    return;
  }

  const data = fs
    .readFileSync(__dirname + `/templates/${file}`, "utf-8")
    .split(`$name`)
    .join(name);
  fs.writeFile(`${path}/${name}/${fileName}`, data, err => {
    if (err) {
      console.log(`Cannot create "${fileName}"`);
    } else {
      console.log(`"${fileName}" created`);
    }
  });
};

const warnAndExit = error => {
  console.warn(error);
  process.exit(-1);
};

const main = () => {
  const commands = new Commands();

  //Add
  program
    .description(`Create a new react component\n----------------------------`)
    .command(`add [url]", "creates a new component in ${DEFAULT_PATH}`)
    .option(
      "-p, --path [path]",
      `The path where you want to create the compoenent (default: ${DEFAULT_PATH})`
    )
    .action(function(url) {
      commands.add(url, this.path || DEFAULT_PATH);
    });

  program.parse(process.argv);
};

main();
