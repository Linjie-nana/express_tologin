const jwt = require("jsonwebtoken");
// 密钥，用来验证真伪
const key = "heima";
// 生成token
const createToken = function (username) {
  const token = jwt.sign({ username }, key, { expiresIn: "1h" });
  return token;
};

// 验证token是否有效
const verifyToken = function (token) {
  try {
    jwt.verify(token, key);
    return true;
  } catch (err) {
    return false;
  }
};

// 权限验证
const checkRole = function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const isValidate = verifyToken(token);
    if (isValidate) {
      next();
    } else {
      res.send({ code: -1, msg: "没有访问权限" });
    }
  } else {
    res.send({ code: -1, msg: "token不能为空" });
  }
};

module.exports = {
  createToken,
  verifyToken,
  checkRole
};