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
  const { orderBy, dir, search } = req.query;

  try {
    const languages = await languageQuery.getLanguages(orderBy, dir, search);
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

app.delete("/api/v2/languages/:langid", async (req, res) => {
  try {
    await languageQuery.deleteLanguage(req.params.langid);
    res.status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function logger(req, res, next) {
  const ts = new Date();
  console.log(`[${ts}]: ${req.method} ${req.originalUrl}`);
  next();
}

app.get("/api/v2/feedbacks", async (req, res) => {
  try {
    const feedbacks = await feedbackQuery.getFeedbacks();
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/v2/feedbacks/summary/:langid", async (req, res) => {
  try {
    const feedbacks = await feedbackQuery.getFeedbackSummary(req.params.langid);
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/v2/feedbacks/vote/:langid", async (req, res) => {
  try {
    const vote = req.body.vote;
    const langid = parseInt(req.params.langid);
    await feedbackQuery.vote(langid, vote);
    res.json({
      msg: `Vote ${vote} was added to language with ID ${langid}`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function main(){
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

main();