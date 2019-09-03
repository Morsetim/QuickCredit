"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

;
var connectionString = process.env.DEV_URL;

_dotenv["default"].config();

var db = new _pg.Pool(connectionString);
db.connect().then(function () {
  console.log('Successfully connected to PosgresDB');
  console.log(connectionString, "==========Connected=========");
})["catch"](function (err) {
  console.log(err.message);
});
var _default = db;
exports["default"] = _default;