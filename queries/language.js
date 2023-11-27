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

async function getLanguages(search) {
  let languages = await readLanguages();
  
  // filter
  if (search) {
    languages = languages.filter((lang) => {
      return (
        lang.name.toLowerCase().includes(search.toLowerCase()) ||
        lang.maintainer.toLowerCase().includes(search.toLowerCase()) ||
        lang.designer.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  


  return languages;
}

async function getLanguage(langid) {
  const languages = await readLanguages();
  const response = languages.find((lang) => lang.langid === parseInt(langid));
  if (response) {
    return response;
  } else {
    throw new Error(`Language with id ${langid} does not exist`);
  }
}

async function createLanguage(lang) {
  const languages = await readLanguages();
  if(!languages.find((language) => language.langid === lang.langid)){
    languages.push(lang);
    await fs.writeFile(languageFilePath, JSON.stringify(languages));
    return lang;
  } else {
    throw new Error(`Language with id ${lang.langid} already exist`);
  }
}

async function replaceLanguage(id, lang) {
  const languages = await readLanguages();
  const index = languages.findIndex((l) => l.langid === parseInt(id));
  if (index !== -1) {
    const newLang = {langid: parseInt(id), ...lang};
    languages[index] = newLang;
    await fs.writeFile(languageFilePath, JSON.stringify(languages));
    return newLang;
  } else {
    throw new Error(`Language with id ${lang.langid} does not exist`);
  }
}

async function patchLanguage(id, lang) {
  const languages = await readLanguages();
  const index = languages.findIndex((l) => l.langid === parseInt(id));
  if (index !== -1) {
    for (const key in lang) {
      if (languages[index][key]) {
        languages[index][key] = lang[key];
      } else {
        throw new Error(`Language with id ${lang.langid} does not has existing ${key} property`);
      }
    }
    await fs.writeFile(languageFilePath, JSON.stringify(languages));
    return lang;
  } else {
    throw new Error(`Language with id ${lang.langid} does not exist`);
  }
}

module.exports = {
  getLanguages,
  getLanguage,
  createLanguage,
  replaceLanguage,
  patchLanguage
};
