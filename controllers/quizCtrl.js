const { getQuizCollection } = require("../helpers/db-conn");
const { ObjectId } = require("mongodb");

const QuizCtrl = () => {
  // Get all quizzes
  const getQuizzes = async () => {
    try {
      const collection = getQuizCollection();
      const data = await collection.find({}).toArray();
      return { success: true, message: "Quizzes retrieved successfully!", data: data };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  // Add new quiz
  const addQuiz = async (quizData) => {
    try {
      const collection = getQuizCollection();
      
      // Validate required fields
      if (!quizData.title || !quizData.description) {
        return { success: false, message: "Title and description are required" };
      }

      // If the new quiz is being set as active, set all other quizzes to inactive
      if (quizData.isActive === true) {
        await collection.updateMany(
          { _id: { $ne: null } },
          { $set: { isActive: false } }
        );
      }

      // Add creation timestamp
      const newQuiz = {
        ...quizData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(newQuiz);
      
      if (result.acknowledged) {
        return { success: true, message: "Quiz added successfully!", data: { id: result.insertedId } };
      } else {
        return { success: false, message: "Failed to add quiz" };
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  // Edit quiz
  const editQuiz = async (quizId, quizData) => {
    try {
      const collection = getQuizCollection();
      
      // Validate required fields
      if (!quizData.title || !quizData.description) {
        return { success: false, message: "Title and description are required" };
      }

      // If the quiz is being set as active, set all other quizzes to inactive
      if (quizData.isActive === true) {
        await collection.updateMany(
          { _id: { $ne: new ObjectId(quizId) } },
          { $set: { isActive: false } }
        );
      }

      // Add update timestamp
      const updateData = {
        ...quizData,
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(quizId) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return { success: false, message: "Quiz not found" };
      }

      if (result.modifiedCount > 0) {
        return { success: true, message: "Quiz updated successfully!" };
      } else {
        return { success: false, message: "No changes made to quiz" };
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  // Remove quiz
  const removeQuiz = async (quizId) => {
    try {
      const collection = getQuizCollection();
      
      const result = await collection.deleteOne({ 
        _id: new ObjectId(quizId) 
      });

      if (result.deletedCount === 0) {
        return { success: false, message: "Quiz not found" };
      }

      return { success: true, message: "Quiz removed successfully!" };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  return {
    getQuizzes,
    addQuiz,
    editQuiz,
    removeQuiz,
  };
};

module.exports = QuizCtrl(); 