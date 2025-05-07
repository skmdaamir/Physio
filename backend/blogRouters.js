const express = require("express");
const router = express.Router();
const db = require("./dbConnection");
const multer = require("multer");
const path = require("path");

// Full absolute path to the uploads directory
const uploadPath = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // uploads folder inside backend
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload image and add blog
router.post("/blogs", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const image_url = req.file ? req.file.path : null;

  const sql = `INSERT INTO blog (title, content, image_url, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, NOW(), NOW())`;

  db.query(sql, [title, content, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res
      .status(201)
      .json({
        message: "Blog added",
        blogId: result.insertId,
        imagePath: image_url,
      });
  });
});

// // Add Blog
// router.post("/blogs", (req, res) => {
//   const { title, content, image_url } = req.body;
//   const sql = `INSERT INTO blog (title, content, image_url, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, NOW(), NOW())`;

//   db.query(sql, [title, content, image_url], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ message: "Blog added", blogId: result.insertId });
//   });
// });

// Update Blog
router.put("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  const sql = `UPDATE blog SET title = ?, content = ?, image_url = ?, updated_at = NOW() WHERE id = ?`;

  db.query(sql, [title, content, image_url, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Blog updated" });
  });
});

// Delete Blog
router.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM blog WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Blog deleted" });
  });
});

// Enable/Disable Blog
router.patch("/blogs/:id/status", (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body; // 1 for enable, 0 for disable
  const sql = `UPDATE blog SET is_active = ?, updated_at = NOW() WHERE id = ?`;

  db.query(sql, [is_active, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: `Blog ${is_active ? "enabled" : "disabled"}` });
  });
});

// Fetch all active blogs
router.get("/blogs/active", (req, res) => {
  const sql = `SELECT * FROM blog WHERE is_active = 1 ORDER BY created_at DESC`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ blogs: results });
  });
});

module.exports = router;
