"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var authToken = function authToken(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']; // decode the token generated by user payload during signin or signup

  if (token) {
    _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401);
        res.json({
          status: 'Failed',
          message: 'Authentication failed. Token is either invalid or expired'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403);
    res.json({
      status: 'Failed',
      message: 'wrong token. provide  a valid token'
    });
  }
};

var _default = authToken;
exports["default"] = _default;