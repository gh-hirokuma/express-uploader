var express = require("express");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/upload", function(req, res, next) {
  res.render("upload", { title: "Express" });
});

router.post("/upload", upload.single("file"), function(req, res) {
  console.log(req.body.name);
  const { path } = res.req.file;
  console.log(
    path
      .split("/")
      .filter(item => item !== "public")
      .reduce((a, b, i) => {
        if (i === 1) return `/${a}/${b}`;
        else return `${a}/${b}`;
      })
  );

  res.json({ result: "success!" });
});

module.exports = router;
