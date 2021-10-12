module.exports = {
  cityarea: async (req, res, next) => {
    const arr = [
      // 서울
      [58, 125, 01],
      [58, 126, 01],
      [59, 124, 01],
      [59, 125, 01],
      [59, 127, 01],
      [60, 126, 01],
      [60, 127, 01],
      [61, 125, 01],
      [61, 126, 01],
      [61, 127, 01],
      [61, 128, 01],
      [61, 129, 01],
      [62, 126, 01],
      [62, 128, 01],
    ];
    const id = req.query.id;
    console.log(id);
    req.body = arr;
    console.log(req.body);
    next();
  },
};
