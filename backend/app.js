
const express = require("express");
const mongoose = require("mongoose");
const router = require("./route/userRoute");
const multer = require("multer");
const path = require("path");

const app = express();
const cors = require("cors");

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use("/users", router);
app.use("/files", express.static("files"));
app.use("/images", express.static("images")); 

// ================= MONGODB =================
mongoose.connect("mongodb+srv://dbUser:OogdhyWLrog4ofqB@cluster0.uuq5ely.mongodb.net/")
.then(() => console.log("Connected to Mongodb"))
.then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch((err) => console.log(err));

// ================= REGISTER =================
require("./models/registerModel");
const User = mongoose.model("registerModel");

app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;

  try {
    await User.create({ name, gmail, password });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "err" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { name, gmail, password } = req.body;

  try {
    const user = await User.findOne({ name, gmail, password });

    if (!user) {
      return res.json({ status: "error", message: "Login failed" });
    }

    res.json({ status: "ok", message: "Login successful" });
  } catch (err) {
    res.status(500).json({ status: "error" });
  }
});

// ================= PDF MODEL =================
require("./models/pdfModel");
const Pdf = mongoose.model("pdfDetails");

// ================= IMAGE MODEL =================
require("./models/imageModel"); 
const Image = mongoose.model("Image"); 

// ================= PDF MULTER =================
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const pdfUpload = multer({
  storage: pdfStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF allowed"), false);
  },
});

// ================= IMAGE MULTER =================
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  },
});

// ================= PDF APIs =================
app.post("/uploadfile", pdfUpload.single("file"), async (req, res) => {
  try {
    await Pdf.create({
      title: req.body.title,
      pdf: req.file.filename,
    });

    res.send({ status: 200 });
  } catch (err) {
    res.send({ status: 500 });
  }
});

app.get("/getFile", async (req, res) => {
  try {
    const data = await Pdf.find({});
    res.send({ status: 200, data });
  } catch (err) {
    res.send({ status: 500 });
  }
});

// ================= IMAGE APIs =================
app.post("/uploadImage", imageUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.send({ status: 400, message: "No file uploaded" });
    }

    await Image.create({
      image: req.file.filename,
    });

    res.send({ status: 200, message: "Image uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.send({ status: 500 });
  }
});

app.get("/getImages", async (req, res) => {
  try {
    const data = await Image.find({});
    res.send({ status: 200, data });
  } catch (err) {
    res.send({ status: 500 });
  }
});
