const express = require('express');
const languageQuery = require('./queries/language');
const feedbackQuery = require('./queries/feedback');


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Popular programming languages API 2.0.');
});

app.get('/api/v2/languages', async (req, res, next) => {
  const { search } = req.query;

  try {
    const languages = await languageQuery.getLanguages(search);
    res.status(200).send(languages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/api/v2/languages/:langid", async (req, res) => {
  try {
    const language = await languageQuery.getLanguage(req.params.langid);
    res.status(200).send(language);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/v2/languages", async (req, res) => {
  try {
    const language = await languageQuery.createLanguage(req.body);
    res.status(200).send(language);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/api/v2/languages/:langid", async (req, res) => {
  try {
    const language = await languageQuery.replaceLanguage(req.params.langid, req.body);
    res.status(200).send(language);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/api/v2/languages/:langid", async (req, res) => {
  try {
    const language = await languageQuery.patchLanguage(req.params.langid, req.body);
    res.status(200).send(language);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}


function main(){
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

main();