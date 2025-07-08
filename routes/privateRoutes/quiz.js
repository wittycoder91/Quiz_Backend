const express = require("express");
const quizRouter = express.Router();
const quizCtrl = require("../../controllers/quizCtrl");

// GET /quiz/admin/get-quizzes
quizRouter.get("/admin/get-quizzes", async (req, res) => {
  try {
    const result = await quizCtrl.getQuizzes();
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /quiz/admin/add-quiz
quizRouter.post("/admin/add-quiz", async (req, res) => {
  try {
    const quizData = req.body;
    const result = await quizCtrl.addQuiz(quizData);
    
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /quiz/admin/edit-quiz (for compatibility with frontend POST requests)
quizRouter.post("/admin/edit-quiz", async (req, res) => {
  try {
    const { selID, ...quizData } = req.body;

    if (!selID) {
      return res.status(400).json({ success: false, message: "Quiz ID (selID) is required" });
    }

    const result = await quizCtrl.editQuiz(selID, quizData);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE /quiz/admin/remove-quiz/:id
quizRouter.post("/admin/remove-quiz/:id", async (req, res) => {
  try {
    const quizId = req.params.id;
    const result = await quizCtrl.removeQuiz(quizId);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /quiz/admin/remove-quiz (for compatibility with frontend POST requests)
quizRouter.post("/admin/remove-quiz", async (req, res) => {
  try {
    const { selID } = req.body;

    if (!selID) {
      return res.status(400).json({ success: false, message: "Quiz ID (selID) is required" });
    }

    const result = await quizCtrl.removeQuiz(selID);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = quizRouter; 