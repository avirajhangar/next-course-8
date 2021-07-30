import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  const filepath = path.join(process.cwd(), "data", "feedback.json");
  return filepath;
}

export function extractFeedback(filepath) {
  const fileData = fs.readFileSync(filepath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.text;

    const newFeedBack = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    data.push(newFeedBack);
    fs.writeFileSync(filepath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", feedback: feedback });
  } else {
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);

    res.status(200).json({ feedbacks: data });
  }
}

export default handler;
