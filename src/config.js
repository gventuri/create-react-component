const fs = require("fs");

const CONFIG = fs.existsSync(".react-templates/config.json")
  ? JSON.parse(fs.readFileSync(".react-templates/config.json", "utf-8"))
  : {};
const DEFAULT_PATH = CONFIG.path || "src/components";
const DIR = fs.existsSync(".react-templates")
  ? ".react-templates"
  : __dirname + "/../templates";
const DEFAULT_DIR = ".react-templates";

module.exports = { CONFIG, DEFAULT_PATH, DIR, DEFAULT_DIR };
