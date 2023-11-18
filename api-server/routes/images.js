var express = require("express");
var router = express.Router();
var path = require("path");
var imageUploader = require("./imageUploader");

router.get("/:imageSrc", function (req, res, next) {
  try {
    const imageSrc = req.params.imageSrc;
    console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname, "images", imageSrc));
  } catch (err) {
    next(err);
  }
});

class ProfileController {
  static editProfileImage = async (req, res) => {
    const filePath = req.file.location;

    if (!filePath) {
      throw new Error({
        status: 401,
        response: {
          message: "Invalid file path",
        },
      });
    }
    const profile = await imageUploader({
      photoUrl: filePath,
    });
    res.status(200).send(profile);
  };
}

router.post(
  "/",
  imageUploader.single("image"),
  ProfileController.editProfileImage
);

module.exports = router;
