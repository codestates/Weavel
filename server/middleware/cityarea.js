module.exports = {
  cityarea: (req, res, next) => {
    const cityId = req.query.id;
    if (cityId === "01") req.body = arr1;
    if (cityId === "02") req.body = arr2;
    if (cityId === "03") req.body = arr3;
    if (cityId === "04") req.body = arr4;
    if (cityId === "05") req.body = arr5;
    if (cityId === "06") req.body = arr6;
    if (cityId === "07") req.body = arr7;
    if (cityId === "08") req.body = arr8;
    if (cityId === "09") req.body = arr9;
    if (cityId === "10") req.body = arr10;
    if (cityId === "11") req.body = arr11;
    if (cityId === "12") req.body = arr12;
    if (cityId === "13") req.body = arr13;
    if (cityId === "14") req.body = arr14;
    if (cityId === "15") req.body = arr15;
    if (cityId === "16") req.body = arr16;
    if (cityId === "17") req.body = arr17;
    next();
  },
};
const arr1 = [
  // 서울 14
  [58, 125],
  [58, 126],
  [59, 124],
  [59, 125],
  [59, 127],
  [60, 126],
  [60, 127],
  [61, 125],
  [61, 126],
  [61, 127],
  [61, 128],
  [61, 129],
  [62, 126],
  [62, 128],
];
const arr2 = [
  // 부산 11
  [96, 74],
  [96, 75],
  [96, 76],
  [97, 74],
  [97, 75],
  [98, 74],
  [98, 75],
  [98, 76],
  [98, 77],
  [99, 75],
  [100, 77],
];
const arr3 = [
  // 인천 8
  [51, 130],
  [54, 124],
  [54, 125],
  [55, 123],
  [55, 125],
  [55, 126],
  [56, 124],
  [56, 126],
];
const arr4 = [
  // 대구 5
  [86, 88],
  [88, 90],
  [89, 90],
  [89, 91],
  [90, 91],
];
const arr5 = [
  // 대전 3
  [67, 100],
  [67, 101],
  [68, 100],
];
const arr6 = [
  // 광주 5
  [57, 74],
  [59, 73],
  [59, 74],
  [59, 75],
  [60, 74],
];
const arr7 = [
  // 울산 4
  [101, 84],
  [102, 84],
  [103, 85],
  [104, 83],
];
const arr8 = [
  // 세종 12
  [63, 108],
  [64, 104],
  [64, 108],
  [65, 103],
  [65, 104],
  [65, 105],
  [65, 106],
  [65, 107],
  [66, 103],
  [66, 105],
  [66, 106],
  [67, 104],
];
const arr9 = [
  // 제주 2
  [52, 33],
  [53, 38],
];
const arr10 = [
  // 경기 31
  [55, 128],
  [56, 125],
  [56, 129],
  [56, 131],
  [57, 119],
  [57, 121],
  [57, 123],
  [58, 125],
  [59, 122],
  [59, 123],
  [60, 122],
  [60, 124],
  [61, 120],
  [61, 130],
  [61, 131],
  [61, 134],
  [61, 138],
  [62, 114],
  [62, 118],
  [62, 120],
  [63, 124],
  [62, 127],
  [64, 126],
  [64, 128],
  [64, 134],
  [65, 115],
  [65, 123],
  [68, 121],
  [69, 125],
  [69, 133],
  [71, 121],
];
const arr11 = [
  // 강원 18
  [65, 139],
  [72, 139],
  [73, 134],
  [75, 130],
  [76, 122],
  [77, 125],
  [77, 139],
  [80, 138],
  [84, 123],
  [85, 145],
  [86, 119],
  [87, 141],
  [88, 138],
  [89, 123],
  [92, 131],
  [95, 119],
  [97, 127],
  [98, 125],
];
const arr12 = [
  // 충북 11
  [68, 111],
  [69, 107],
  [71, 99],
  [71, 110],
  [72, 113],
  [73, 103],
  [74, 97],
  [74, 111],
  [76, 114],
  [81, 118],
  [84, 115],
];
const arr13 = [
  // 충남 15
  [48, 109],
  [51, 110],
  [54, 100],
  [54, 112],
  [55, 94],
  [55, 106],
  [57, 103],
  [58, 107],
  [59, 99],
  [60, 110],
  [62, 97],
  [63, 102],
  [63, 110],
  [65, 99],
  [69, 95],
];
const arr14 = [
  // 전북 13
  [56, 80],
  [56, 87],
  [56, 92],
  [58, 83],
  [59, 88],
  [60, 91],
  [63, 79],
  [63, 89],
  [66, 84],
  [68, 80],
  [68, 88],
  [70, 85],
  [72, 93],
];
const arr15 = [
  // 전남 21
  [48, 59],
  [50, 66],
  [50, 67],
  [52, 71],
  [52, 72],
  [52, 77],
  [54, 61],
  [56, 66],
  [56, 71],
  [57, 63],
  [57, 56],
  [59, 64],
  [61, 72],
  [61, 78],
  [62, 66],
  [66, 62],
  [69, 75],
  [66, 77],
  [70, 70],
  [73, 66],
  [73, 70],
];
const arr16 = [
  // 경북 22
  [80, 96],
  [81, 102],
  [81, 106],
  [83, 87],
  [83, 91],
  [84, 96],
  [85, 93],
  [86, 107],
  [88, 99],
  [89, 111],
  [90, 101],
  [90, 113],
  [91, 86],
  [91, 90],
  [91, 106],
  [95, 93],
  [96, 103],
  [97, 108],
  [100, 91],
  [102, 95],
  [102, 103],
  [102, 115],
];
const arr17 = [
  // 경남 18
  [74, 73],
  [74, 82],
  [76, 80],
  [77, 86],
  [77, 68],
  [80, 71],
  [81, 75],
  [81, 84],
  [83, 78],
  [85, 71],
  [86, 77],
  [87, 68],
  [87, 83],
  [89, 76],
  [90, 69],
  [92, 83],
  [95, 77],
  [97, 79],
];
