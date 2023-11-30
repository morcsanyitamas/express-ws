const fs = require("fs/promises");
const path = require("path");
const feedbackFilePath = path.join(__dirname, "../db/", "feedback.json");

async function readFeedbacks() {
  return JSON.parse(await fs.readFile(feedbackFilePath));
}

async function writeFeedbacks(feedbacks) {
  await fs.writeFile(feedbackFilePath, JSON.stringify(feedbacks));
}

async function getFeedbacks() {
  const feedbacks = await readFeedbacks();
  return feedbacks;
}

async function getFeedbackSummary(langid) {
  const feedbacks = await readFeedbacks();
  const feedback = feedbacks.filter(
    (feedback) => feedback.langid === parseInt(langid)
  );
  const upVotes = feedback.filter((feedback) => feedback.vote === 1).length;
  const downVotes = feedback.filter((feedback) => feedback.vote === -1).length;
  return { upVotes, downVotes };
}

async function vote(langid, vote) {
    const feedbacks = await readFeedbacks();
    feedbacks.push({ langid, vote });
    await writeFeedbacks(feedbacks);
}

module.exports = {
  getFeedbacks,
  getFeedbackSummary,
  vote,
};
