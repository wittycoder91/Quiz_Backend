const { MongoClient } = require("mongodb");
// const mongodbUri = "mongodb://localhost:27017/";
const mongodbUri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(mongodbUri);
let db;

const connectToDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    // Verify connection and initialize the database
    db = client.db("quiz");
    if (!db) {
      throw new Error(
        "Database 'quiz' is undefined. Check the database name."
      );
    }
    console.log("Database selected:", db.databaseName);
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  } finally {
    if (client) {
      await client.dis;
      console.log("MongoDB connection closed");
    }
  }
};

getDb = () => {
  return db;
};

getUserCollection = () => {
  return db.collection("users");
};
getAdminCollection = () => {
  return db.collection("admins");
};
getMaterialCollection = () => {
  return db.collection("materials");
};
getIndustryCollection = () => {
  return db.collection("industry");
};
getColorCollection = () => {
  return db.collection("colors");
};
getResidueCollection = () => {
  return db.collection("residues");
};
getConditionCollection = () => {
  return db.collection("conditions");
};
getSettingCollection = () => {
  return db.collection("settings");
};
getFAQCollection = () => {
  return db.collection("faqs");
};
getPackageCollection = () => {
  return db.collection("packages");
};
getQualityCollection = () => {
  return db.collection("qualitys");
};
getDeliveryCollection = () => {
  return db.collection("deliverys");
};
getDeliveryLogsCollection = () => {
  return db.collection("deliverylogs");
};
getDeliveryColorsCollection = () => {
  return db.collection("colors");
};
getDeliveryResiduesCollection = () => {
  return db.collection("residues");
};
getDeliveryConditionsCollection = () => {
  return db.collection("conditions");
};
getDateCollection = () => {
  return db.collection("dates");
};
getQuizCollection = () => {
  return db.collection("quizzes");
};
getQuestionsCollection = () => {
  return db.collection("questions");
};

module.exports = {
  getDb,
  connectToDatabase,
  getUserCollection,
  getAdminCollection,
  getMaterialCollection,
  getIndustryCollection,
  getColorCollection,
  getResidueCollection,
  getConditionCollection,
  getSettingCollection,
  getFAQCollection,
  getPackageCollection,
  getQualityCollection,
  getDeliveryCollection,
  getDeliveryLogsCollection,
  getDeliveryColorsCollection,
  getDeliveryResiduesCollection,
  getDeliveryConditionsCollection,
  getDateCollection,
  getQuizCollection,
  getQuestionsCollection,
};
