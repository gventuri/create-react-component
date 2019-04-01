#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */

const fs = require("fs");
const program = require("commander");

const DEFAULT_PATH = "src/components";
const DIR = fs.existsSync(".react-templates")
  ? ".react-templates"
  : __dirname + "/templates";

const HELP_MSG = `
NAME
    create-react-component-cli — react cli to create templated component

DESCRIPTION
    Create-react-component-cli allows to create react component easilt providing an interface 
    implement your own template.

SYNOPSIS
    create-react-component-cli <command> [name] [options]

AVAILABLE COMMAND:
    add     creates a new component using the provided name. default path: '${DEFAULT_PATH}'

OPTIONS
    -path   override default path.

COPYRIGHT
    create-react-component-cli is available under the MIT license.
    create-react-component-cli also includes external libraries that are available under MIT license.

SEE ALSO
    GitHub repository & Issue Tracker: https://github.com/gventuri/create-react-component
    Npmjs: https://www.npmjs.com/package/create-react-component-cli
    Website:
    Documentation:

AUTHORS
    Gabriele Venturi (https://github.com/gventuri)

CONTRIBUTORS
    Gianni Vandalbrini (https://github.com/gvaldambrini)
    Roberto Di Lillo (https://github.com/koop4)
`;
const WRONG_PATH_MSG = `The path provided is wrong`;
const PROJ_INIT = `The project has been initialized`;
const ALREADY_INIT = `The project has already been initialized`;

class Commands {
  add(name, path) {
    path = path || DEFAULT_PATH;

    if (!fs.existsSync(path)) warnAndExit(WRONG_PATH_MSG);

    try {
      fs.mkdirSync(`${path}/${name}/`, { recursive: true });
    } catch (err) {
      warnAndExit(`Cannot create the directory "${path}/${name}".`);
    }

    const templates = fs.readdirSync(DIR);
    for (let template of templates) createFile(template, name, path);
  }

  init() {
    try {
      if (DIR == ".react-templates") warnAndExit(ALREADY_INIT);

      fs.mkdirSync(`.react-templates`, { recursive: true });

      const files = fs.readdirSync(DIR);
      for (let file of files) {
        const data = fs.readFileSync(`${DIR}/${file}`, "utf-8");
        fs.writeFile(`.react-templates/${file}`, data, err => {
          if (err) {
            console.log(`Cannot create "${file}"`);
          } else {
            console.log(`"${file}" created`);
          }
        });
      }

      console.log(PROJ_INIT);
    } catch (err) {
      warnAndExit(`Cannot create the directory ".react-templates".`);
    }
  }
}

const help = () => {
  console.log(HELP_MSG);
};

const createFile = async (file, name, path) => {
  const fileName = file.replace("$name", name);

  if (fs.existsSync(`${path}/${name}/${fileName}`)) {
    console.log(`File "${fileName}" already exists, skipping.`);
    return;
  }

  const data = fs
    .readFileSync(`${DIR}/${file}`, "utf-8")
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

  program.arguments("<cmd> [name]");

  program.command("help").action(() => help);

  program
    .command("add [name]")
    .option("-p, --path [path]")
    .action((name, opt) => {
      commands.add(name, opt.path);
    });

  program.command("init").action(() => {
    commands.init();
  });

  program.parse(process.argv);
};

main();
