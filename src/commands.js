const fs = require("fs");
const inquirer = require("inquirer");
const messages = require("./messages");

const CONFIG = require("./config").CONFIG;
const DEFAULT_PATH = require("./config").DEFAULT_PATH;
const DIR = require("./config").DIR;
const DEFAULT_DIR = require("./config").DEFAULT_DIR;

class Commands {
  help() {
    console.log(messages.HELP_MSG);
  }

  init() {
    try {
      if (DIR === DEFAULT_DIR) warnAndExit(messages.ALREADY_INIT);

      fs.mkdirSync(DEFAULT_DIR, { recursive: true });

      const files = fs.readdirSync(DIR);
      for (let file of files) {
        const data = fs.readFileSync(`${DIR}/${file}`, "utf-8");
        fs.writeFile(`${DEFAULT_DIR}/${file}`, data, err => {
          if (err) {
            console.log(`Cannot create "${file}"`);
          } else {
            console.log(`"${file}" created`);
          }
        });
      }

      setTimeout(() => this.config(), 200);

      console.log(messages.PROJ_INIT);
    } catch (err) {
      console.log(err);
      warnAndExit(`Cannot create the directory "${DEFAULT_DIR}".`);
    }
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
      }
    ];

    inquirer.prompt(questions).then(function(answers) {
      try {
        fs.writeFileSync(`${DEFAULT_DIR}/config.json`, JSON.stringify(answers));
      } catch (err) {
        warnAndExit(`You need to initialize the cli before you configure it.`);
      }
    });
  }

  add(name, path) {
    path = path || DEFAULT_PATH;

    if (!fs.existsSync(path)) warnAndExit(messages.WRONG_PATH_MSG);

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
      console.log(`"${fileName}" has been created`);
    }
  });
};

const warnAndExit = error => {
  console.warn(error);
  process.exit(-1);
};

module.exports = Commands;
