#!/usr/bin/env node

/***
 * CREATE COMPONENT CLI
 * A CLI for creating new react components
 */

const fs = require("fs");
const program = require("commander");
const Commands = require("./src/commands");
const DEFAULT_DIR = require("./src/config").DEFAULT_DIR;

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

  program.command("init").action(() => {
    commands.init();
  });

  program.command("config").action(() => {
    commands.config();
  });

  program.command("test").action(() => {
    console.log(
      JSON.parse(fs.readFileSync(`${DEFAULT_DIR}/config.json`, "utf-8"))
    );
  });

  program.parse(process.argv);
};

main();
