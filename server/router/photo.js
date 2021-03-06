const express = require("express");
const router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/vaildator");
const { upload } = require("../middleware/multer");

function photoRouter(photoController) {
  // GET	/photo 사진 조회하기
  router.get(
    "/",
    [
      query("id")
        .trim()
        .notEmpty()
        .withMessage("query에 imageId를 입력해주세요.")
        .isInt()
        .withMessage("query에 번호를 입력해주세요"),
      validateError,
    ],
    accessToken,
    photoController.getPhoto,
  );

  // GET	/photo 사진정보 불러오기
  router.get("/info", accessToken, photoController.getPhotoInfo);

  // POST	/photo 사진 저장
  router.post(
    "/",
    accessToken,
    upload.single("image"),
    photoController.postPhoto,
  );

  // POST	/photo/info 사진 정보 저장
  router.post(
    "/info",
    [
      body("id")
        .trim()
        .notEmpty()
        .withMessage("photoId 정보가 없습니다.")
        .isInt()
        .withMessage("photoId 번호를 입력해주세요."),
      body("weather")
        .trim()
        .notEmpty()
        .withMessage("photo.weather 정보가 없습니다.")
        .isInt()
        .withMessage("photo.weather 번호를 입력해주세요."),
      body("date")
        .trim()
        .notEmpty()
        .withMessage("photo.date 정보를 입력해주세요."),
      body("area")
        .trim()
        .notEmpty()
        .withMessage("photo.area 정보를 입력해주세요."),
      body("comment")
        .trim()
        .notEmpty()
        .withMessage("photo.comment 정보를 입력해주세요."),
      body("filename")
        .trim()
        .notEmpty()
        .withMessage("photo.filename 정보를 입력해주세요."),
      validateError,
    ],
    accessToken,
    photoController.postPhotoInfo,
  );

  // PUT	/photo	사진 수정
  router.put(
    "/",
    [
      query("id")
        .trim()
        .notEmpty()
        .withMessage("photoId 정보가 없습니다.")
        .isInt()
        .withMessage("수정을 원하는 photoId 숫자를 입력하세요"),
      validateError,
    ],
    accessToken,
    upload.single("image"),
    photoController.put,
  );

  // PATCH	/photo/info 사진 정보 수정
  router.patch(
    "/info",
    [
      body("id")
        .trim()
        .notEmpty()
        .withMessage("photoId 정보가 없습니다.")
        .isInt()
        .withMessage("photoId 번호를 입력해주세요."),
      body("filename")
        .trim()
        .notEmpty()
        .withMessage("photo.filename 정보를 입력해주세요."),
      validateError,
    ],
    accessToken,
    photoController.patch_info,
  );

  // DELETE	/photo	사진 삭제
  router.delete(
    "/",
    [
      body("id")
        .trim()
        .notEmpty()
        .withMessage("photoId 정보가 없습니다.")
        .isInt()
        .withMessage("photoId 번호를 입력해주세요."),
      body("weather")
        .trim()
        .notEmpty()
        .withMessage("photo.weather 정보가 없습니다.")
        .isInt()
        .withMessage("photo.weather 번호를 입력해주세요."),
      body("date")
        .trim()
        .notEmpty()
        .withMessage("photo.date 정보를 입력해주세요."),
      body("area")
        .trim()
        .notEmpty()
        .withMessage("photo.area 정보를 입력해주세요."),
      body("filename")
        .trim()
        .notEmpty()
        .withMessage("photo.filename 정보를 입력해주세요."),
      validateError,
    ],
    accessToken,
    photoController.deletePhotoWithInfo,
  );
  return router;
}
module.exports = photoRouter;
