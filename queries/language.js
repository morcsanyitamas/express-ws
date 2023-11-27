const fs = require("fs/promises");
const path = require("path");
const languageFilePath = path.join(
  __dirname,
  "../db/",
  "programming_languages.json"
);

async function readLanguages() {
  const languages = JSON.parse(await fs.readFile(languageFilePath));
  return languages;
}

async function getLanguages() {

}

async function getLanguage(langid) {

}

async function createLanguage(lang) {

}

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
};
