#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 *
 * Author: Gabriele Venturi (https://github.com/gventuri)
 * Contributors: Gianni Vandalbrini (https://github.com/gvaldambrini)
 * License: MIT
 */

const fs = require("fs");

const HELP_MSG = `
CREATE REACT COMPONENT
      create-component <MyComponent>                    creates a new component in src/components
      create-component <MyComponent> --path=<my/dir>    creates a new component in my/dir
END
`;
const MISSING_COMPONENT_MSG = `Missing component name. You need to provide one to create a new component`;
const WRONG_PATH_MSG = `The path provided is wrong`;

const help = () => {
  console.log(HELP_MSG);
};

const newComponent = () => {
  let [, , name, path = "src/components"] = process.argv;

  if (path) path = path.replace("--path=", "");

  if (!name) warnAndExit(MISSING_COMPONENT_MSG);

  if (!fs.existsSync(path)) warnAndExit(WRONG_PATH_MSG);

  try {
    fs.mkdirSync(`${path}/${name}/`, { recursive: true });
  } catch (err) {
    warnAndExit(`Cannot create the directory "${path}/${name}".`);
  }

  const templates = fs.readdirSync(__dirname + "/templates");
  for (template of templates) createFile(template, name, path);
};

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
  if (process.argv.find(el => el == "--help")) {
    help();
  } else {
    newComponent();
  }
};

main();
