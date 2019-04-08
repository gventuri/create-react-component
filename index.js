#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */

const fs = require("fs");
const program = require("commander");
const inquirer = require("inquirer");

let CONFIG = fs.existsSync(".react-templates/config.json")
  ? JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
  : {};

const DEFAULT_PATH = CONFIG.path || "src/components";
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
    create-react-component <command> [name] [options]

AVAILABLE COMMAND:
    init    initialize the cli
    config  change the default settings of the cli. you need to initialize the cli before
    add     creates a new component using the provided name. default path: '${DEFAULT_PATH}'
    travis  create a standard .travis.yml configuration file for your project

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
    Filippo Calabrese (https://github.com/filippocalabrese)
`;
const WRONG_PATH_MSG = `The path provided is wrong`;
const PROJ_INIT = `The project has been initialized`;
const ALREADY_INIT = `The project has already been initialized`;

class Commands {
  help() {
    console.log(HELP_MSG);
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

      setTimeout(() => this.config(), 200);

      console.log(PROJ_INIT);
    } catch (err) {
      warnAndExit(`Cannot create the directory ".react-templates".`);
    }
  }

  static initTravis() {
    const data = fs.readFileSync(__dirname+"/extra/.travis.yml", "utf-8");
    fs.writeFile(__dirname+"/.travis.yml", data, err => {
      if (err) {
        console.log(`Cannot create travis init file`);
      }
    });
  }

  config() {
    const questions = [
      {
        type: "input",
        name: "path",
        message:
          "Please, provide the path where your components will be stored",
        default: "src/components"
      },
      {
        type: "confirm",
        name: "storybook",
        message: "Do you want to enable the support for Storybook?",
        default: true
      },
      {
        type: "confirm",
        name: "travis",
        message:
          "Are you using Travis CI for your software development pipeline?",
        default: true
      }
    ];

    inquirer.prompt(questions).then(function(answers) {
      try {
        fs.writeFileSync(
          ".react-templates/config.json",
          JSON.stringify(answers)
        );

        handleTravis(answers.travis);

      } catch (err) {
        console.log(err);
        warnAndExit(`You need to initialize the cli before you configure it.`);
      }
    });
  }

  add(name, path) {
    path = path || DEFAULT_PATH;

    if (!fs.existsSync(path)) warnAndExit(WRONG_PATH_MSG);

    try {
      fs.mkdirSync(`${path}/${name}/`, { recursive: true });
    } catch (err) {
      warnAndExit(`Cannot create the directory "${path}/${name}".`);
    }

    const templates = fs
      .readdirSync(DIR)
      .filter(
        file =>
          file !== "config.json" &&
          (CONFIG.storybook === true || file !== "$name.stories.js")
      );
    for (let template of templates) createFile(template, name, path);
  }
}

const createFile = (file, name, path) => {
  const fileName = file.replace("$name", name);

  if (fs.existsSync(`${path}/${name}/${fileName}`)) {
    console.log(`File "${fileName}" already exists, skipping.`);
    return;
  }

  const data = fs
    .readFileSync(`${DIR}/${file}`, "utf-8")
    .split(`$name`)
    .join(name);

  fs.writeFileSync(`${path}/${name}/${fileName}`, data, err => {
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

const handleTravis = (flag) => {
  if(flag){
      Commands.initTravis();
  }
  else{
      fs.unlink(".travis.yml", ()=>{console.log('removed travis configuration file');});
  }
}

const main = () => {
  const commands = new Commands();

  program.arguments("<cmd> [name]");

  program.command("help").action(() => commands.help());

  program
    .command("add [name]")
    .option("-p, --path [path]")
    .action((name, opt) => {
      commands.add(name, opt.path);
    });

  program.command("travis").action(() => {
    Commands.initTravis();
  });

  program.command("init").action(() => {
    commands.init();
  });

  program.command("config").action(() => {
    commands.config();
  });

  program.command("test").action(() => {
    console.log(
      JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
    );
  });

  program.parse(process.argv);
};

main();
