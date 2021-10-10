const { photo } = require("../../models");
var fs = require("fs");
module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.query.id;
    // 로그인된 아이디 정보 찾기

    const image = await photo.findOne({ where: { id: id, userId: userId } });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", image);
    fs.readFile(image.image, function (err, data) {
      if (err) {
        throw err;
      }
      res.status(200).end(data); // send로 보내면 파일자체를 보내게 됨
    });
  } catch (err) {
    console.log("err");
  }
};

// function getImgPath(startPath, fileExt) {
//   const dirName = fs.readdirSync(startPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
//   const imgPath = [];
//   dirName.forEach(name => {
//       const filePath = path.join(startPath, name);
//       const fileName = fs.readdirSync(filePath).filter((file) => file.endsWith(fileExt));
//       fileName.forEach(file => {
//           const fullPath = path.join(startPath, name, file);
//           imgPath.push(fullPath);
//       });
//   });
//   return imgPath;
// }

// async function run(){
//   const imagePath = getImgPath('shapes', 'png')
//   imagePath.forEach(path => console.log(path))
// }
// run()
