module.exports = {
  verifyToken: async (req, res, next) => {
    // console.log(req.headers.authorization);
    let token = req.headers.authorization;
    try {
      let payload = await jwt.verify(token, 'Secret');
      req.user = payload;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
