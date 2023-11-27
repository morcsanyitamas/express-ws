const fs = require('fs/promises');
const path = require('path');
const feedbackFilePath = path.join(
    __dirname,'../db/', 'feedback.json'
  );

async function readFeedbacks() {
    return JSON.parse(await fs.readFile(feedbackFilePath));
}

async function getFeedbacks() {

}

async function getFeedbackSummary(langid) {

}

async function vote(langid, vote) {

}

module.exports = {
    getFeedbacks,
    getFeedbackSummary,
    vote
}