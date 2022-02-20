const { photo } = require("../models");

async function findPhoto(photoId, userId) {
  return photo.findOne({
    where: { id: photoId, userId: userId },
  });
}

async function findAllPhotoInfo(userId) {
  return photo.findAll({ where: { userId: userId } });
}

async function createPhoto(userId, photoPath, photoFilename) {
  return photo.create({
    userId: userId,
    image: photoPath,
    filename: photoFilename,
  });
}

async function createPhotoInfo(
  userId,
  weather,
  date,
  area,
  comment,
  id,
  filename,
) {
  return photo.update(
    {
      weather: weather,
      date: date,
      area: area,
      comment: comment,
    },
    { where: { id: id, userId: userId, filename: filename } },
  );
}

async function putPhotoPath(newImagePath, newImageName, id, userId) {
  return photo.update(
    { image: newImagePath, filename: newImageName },
    { where: { id: id, userId: userId } },
  );
}

async function putPhotoInfo(
  weather,
  date,
  area,
  comment,
  photoId,
  userId,
  filename,
) {
  return photo.update(
    {
      weather: weather,
      date: date,
      area: area,
      comment: comment,
      updatedAt: new Date(),
    },
    { where: { id: photoId, userId: userId, filename: filename } },
  );
}

async function deletePhotoInfo(photoId, userId, weather, date, area, filename) {
  return photo.destroy({
    where: {
      id: photoId,
      userId: userId,
      weather: weather,
      date: date,
      area: area,
      filename: filename,
    },
  });
}

module.exports = {
  findPhoto,
  findAllPhotoInfo,
  createPhoto,
  createPhotoInfo,
  putPhotoPath,
  putPhotoInfo,
  deletePhotoInfo,
};
