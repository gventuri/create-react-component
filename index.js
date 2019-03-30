#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI v 1.0
 * A CLI for creating new react components
 *
 * Author: Gabriele Venturi
 * License: MIT
 */

const fs = require("fs");

const help = () => {
  console.log("######");
  console.log("CREATE REACT COMPONENT");
  console.warn(
    "   create-component MyComponent                      creates a new component in src/components"
  );
  console.warn(
    "   create-component MyComponent --path=my/dir:       creates a new component in my/dir"
  );
  console.log("END");
  console.log("######");
};

const newComponent = () => {
  //Grab name
  let [, , name, path = "src/components"] = process.argv;

  if (path) path = path.replace("--path=", "");

  if (!name)
    showError(
      "Missing component name. You need to provide one to create a new component"
    );

  if (!fs.existsSync(path)) showError("The path you provided is wrong");

  fs.mkdir(`${path}/${name}/`, { recursive: true }, err => {});

  for (file of fs.readdirSync("cli/templates")) createFile(file, name, path);
};

createFile = async (file, name, path) => {
  const fileName = file.replace("$name", name).replace(".scss.js", ".scss");

  fs.writeFile(
    `${path}/${name}/${fileName}`,
    await require(`./templates/${file}`)(name),
    err => {
      console.log(`${fileName} created`);
    }
  );
};

showError = error => {
  console.log(error);
  process.exit(-1);
};

if (process.argv.find(el => el == "--help")) {
  help();
} else {
  newComponent();
}
