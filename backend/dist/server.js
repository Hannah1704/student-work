"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongodb = require("mongodb");
var _excluded = ["password"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var app = (0, _express["default"])();
var session = require('express-session');
var port = 3000;
var uri = "mongodb+srv://u23587832:ofeuuAAI8omG4bBI@playlistdatabase.bi7gp.mongodb.net/?retryWrites=true&w=majority&appName=PlaylistDatabase";
var client = new _mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware 
app.use(_express["default"].json());
app.use(_express["default"]["static"]("frontend/public"));

// session - user can log in 
app.use(session({
  secret: 'mySuperSecretKey123!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
function startServer() {
  return _startServer.apply(this, arguments);
}
function _startServer() {
  _startServer = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31() {
    var db;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return client.connect();
        case 3:
          console.log("Connected to MongoDB");
          db = client.db("myDatabase");
          app.use(function (req, res, next) {
            req.db = db;
            next();
          });

          // -----------------------------------------------------------------------------------------
          // PLAYLISTS  

          // add remove
          app.put('/api/playlists/:playlistId', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
              var playlistId, _req$body, name, description, result;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    playlistId = req.params.playlistId;
                    _req$body = req.body, name = _req$body.name, description = _req$body.description; // Modify these as per your requirements
                    _context.prev = 2;
                    _context.next = 5;
                    return req.db.collection('playlists').updateOne({
                      _id: new _mongodb.ObjectId(playlistId)
                    }, {
                      $set: {
                        name: name,
                        description: description
                      }
                    } // Update other fields as necessary
                    );
                  case 5:
                    result = _context.sent;
                    if (result.modifiedCount === 1) {
                      res.status(200).send("Playlist updated successfully.");
                    } else {
                      res.status(404).send("Playlist not found or no changes made.");
                    }
                    _context.next = 12;
                    break;
                  case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](2);
                    res.status(500).send("Error updating playlist.");
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[2, 9]]);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());

          // READ: all playlists  -- it works!
          app.get('/api/playlists', /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
              var playlists;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return req.db.collection('playlists').find().toArray();
                  case 3:
                    playlists = _context2.sent;
                    res.status(200).send(playlists);
                    _context2.next = 10;
                    break;
                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2["catch"](0);
                    res.status(500).send("Error fetching playlists");
                  case 10:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[0, 7]]);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }());

          // CREATE: new playlist -- updated version with final version of playlists
          app.post('/api/playlists', /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
              var _req$body2, name, songs, category, description, coverImage, hashtags, playlistCollection, newPlaylist, result;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _req$body2 = req.body, name = _req$body2.name, songs = _req$body2.songs, category = _req$body2.category, description = _req$body2.description, coverImage = _req$body2.coverImage, hashtags = _req$body2.hashtags;
                    playlistCollection = req.db.collection('playlists');
                    newPlaylist = {
                      name: name,
                      songs: songs,
                      category: category,
                      description: description,
                      coverImage: coverImage,
                      hashtags: hashtags || [],
                      createdAt: new Date()
                    };
                    _context3.next = 6;
                    return playlistCollection.insertOne(newPlaylist);
                  case 6:
                    result = _context3.sent;
                    res.status(201).json(result.insertedId);
                    _context3.next = 14;
                    break;
                  case 10:
                    _context3.prev = 10;
                    _context3.t0 = _context3["catch"](0);
                    console.error('Error inserting playlist:', _context3.t0.message);
                    res.status(500).send('Internal Server Error');
                  case 14:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 10]]);
            }));
            return function (_x5, _x6) {
              return _ref3.apply(this, arguments);
            };
          }());

          // READ: specific playlist -- works by returning the entire playlist back
          app.get('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
              var id, playlist;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    id = req.params.id;
                    _context4.prev = 1;
                    _context4.next = 4;
                    return req.db.collection('playlists').findOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 4:
                    playlist = _context4.sent;
                    if (playlist) {
                      _context4.next = 7;
                      break;
                    }
                    return _context4.abrupt("return", res.status(404).send("Playlist not found"));
                  case 7:
                    res.status(200).send(playlist);
                    _context4.next = 13;
                    break;
                  case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4["catch"](1);
                    res.status(500).send("Error fetching playlist (playlist may not exist)");
                  case 13:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4, null, [[1, 10]]);
            }));
            return function (_x7, _x8) {
              return _ref4.apply(this, arguments);
            };
          }());

          // PUT: update specific playlist name
          app.put('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
              var id, name, result;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    id = req.params.id;
                    name = req.body.name;
                    _context5.prev = 2;
                    _context5.next = 5;
                    return req.db.collection('playlists').updateOne({
                      _id: new _mongodb.ObjectId(id)
                    }, {
                      $set: {
                        name: name
                      }
                    });
                  case 5:
                    result = _context5.sent;
                    if (!(result.matchedCount === 0)) {
                      _context5.next = 8;
                      break;
                    }
                    return _context5.abrupt("return", res.status(404).send("Playlist not found"));
                  case 8:
                    res.status(200).send("Playlist name updated successfully");
                    _context5.next = 14;
                    break;
                  case 11:
                    _context5.prev = 11;
                    _context5.t0 = _context5["catch"](2);
                    res.status(500).send("Error updating playlist");
                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[2, 11]]);
            }));
            return function (_x9, _x10) {
              return _ref5.apply(this, arguments);
            };
          }());

          // DELETE: specific playlist -- works -- deletes specific playlist 
          app["delete"]('/api/playlists/:id', /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
              var id, result;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    id = req.params.id;
                    _context6.prev = 1;
                    _context6.next = 4;
                    return req.db.collection('playlists').deleteOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 4:
                    result = _context6.sent;
                    if (!(result.deletedCount === 0)) {
                      _context6.next = 7;
                      break;
                    }
                    return _context6.abrupt("return", res.status(404).send("Playlist not found"));
                  case 7:
                    res.status(200).send("Playlist deleted successfully");
                    _context6.next = 13;
                    break;
                  case 10:
                    _context6.prev = 10;
                    _context6.t0 = _context6["catch"](1);
                    res.status(500).send("Error deleting playlist");
                  case 13:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[1, 10]]);
            }));
            return function (_x11, _x12) {
              return _ref6.apply(this, arguments);
            };
          }());

          // --------------------------------------------------------------------------------------------
          // --------------------------------------------------------------------------------------------

          // USERS
          // CREATE: a new user - now likedsongs and playlists
          app.post('/api/users', /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
              var _req$body3, username, password, followerCount, pronouns, bio, socialMedia, followings, likedSongs, personalPlaylists, userCollection, newUser, result;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password, followerCount = _req$body3.followerCount, pronouns = _req$body3.pronouns, bio = _req$body3.bio, socialMedia = _req$body3.socialMedia, followings = _req$body3.followings, likedSongs = _req$body3.likedSongs, personalPlaylists = _req$body3.personalPlaylists;
                    userCollection = req.db.collection('users');
                    newUser = {
                      username: username,
                      password: password,
                      followerCount: followerCount || {
                        "$numberInt": "0"
                      },
                      pronouns: pronouns || "",
                      bio: bio || "",
                      socialMedia: socialMedia || [],
                      followings: followings || [],
                      likedSongs: likedSongs || [],
                      personalPlaylists: personalPlaylists || []
                    };
                    _context7.next = 6;
                    return userCollection.insertOne(newUser);
                  case 6:
                    result = _context7.sent;
                    res.status(201).json(result.insertedId);
                    _context7.next = 14;
                    break;
                  case 10:
                    _context7.prev = 10;
                    _context7.t0 = _context7["catch"](0);
                    console.error('Error inserting user:', _context7.t0.message);
                    res.status(500).send('Internal Server Error');
                  case 14:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 10]]);
            }));
            return function (_x13, _x14) {
              return _ref7.apply(this, arguments);
            };
          }());

          // READ: all users -- works perfectly
          app.get('/api/users', /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
              var users;
              return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.prev = 0;
                    _context8.next = 3;
                    return req.db.collection('users').find({}, {
                      projection: {
                        username: 1,
                        bio: 1,
                        followings: 1
                      }
                    }).toArray();
                  case 3:
                    users = _context8.sent;
                    res.status(200).send(users);
                    _context8.next = 10;
                    break;
                  case 7:
                    _context8.prev = 7;
                    _context8.t0 = _context8["catch"](0);
                    res.status(500).send("Error fetching users");
                  case 10:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8, null, [[0, 7]]);
            }));
            return function (_x15, _x16) {
              return _ref8.apply(this, arguments);
            };
          }());

          // READ: specific user -- works perfectly
          app.get('/api/users/:id', /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
              var userId, user;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    userId = req.params.id;
                    _context9.prev = 1;
                    _context9.next = 4;
                    return User.findById(userId);
                  case 4:
                    user = _context9.sent;
                    if (user) {
                      _context9.next = 7;
                      break;
                    }
                    return _context9.abrupt("return", res.status(404).send('User not found'));
                  case 7:
                    res.json(user);
                    _context9.next = 13;
                    break;
                  case 10:
                    _context9.prev = 10;
                    _context9.t0 = _context9["catch"](1);
                    res.status(500).send('Error fetching user');
                  case 13:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[1, 10]]);
            }));
            return function (_x17, _x18) {
              return _ref9.apply(this, arguments);
            };
          }());

          // UNFOLLOW: user
          app.post('/api/users/unfollow', /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
              var friendId, currentUserId;
              return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    friendId = req.body.friendId;
                    currentUserId = req.user.id;
                    _context10.prev = 2;
                    _context10.next = 5;
                    return User.updateOne({
                      _id: currentUserId
                    }, {
                      $pull: {
                        followings: friendId
                      }
                    });
                  case 5:
                    res.sendStatus(200);
                    _context10.next = 11;
                    break;
                  case 8:
                    _context10.prev = 8;
                    _context10.t0 = _context10["catch"](2);
                    res.status(500).send('Error unfollowing user');
                  case 11:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10, null, [[2, 8]]);
            }));
            return function (_x19, _x20) {
              return _ref10.apply(this, arguments);
            };
          }());

          // DELETE: specific user
          app["delete"]('/api/users/:id', /*#__PURE__*/function () {
            var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
              var id, result;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    id = req.params.id;
                    _context11.prev = 1;
                    _context11.next = 4;
                    return req.db.collection('users').deleteOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 4:
                    result = _context11.sent;
                    if (!(result.deletedCount === 0)) {
                      _context11.next = 7;
                      break;
                    }
                    return _context11.abrupt("return", res.status(404).send("User not found"));
                  case 7:
                    res.status(200).send("User deleted successfully");
                    _context11.next = 14;
                    break;
                  case 10:
                    _context11.prev = 10;
                    _context11.t0 = _context11["catch"](1);
                    console.error('Error deleting user:', _context11.t0);
                    res.status(500).send("Error deleting user");
                  case 14:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11, null, [[1, 10]]);
            }));
            return function (_x21, _x22) {
              return _ref11.apply(this, arguments);
            };
          }());

          // -----------------------------------------------------------------------------------------
          // -----------------------------------------------------------------------------------------

          //SONGS 
          // ADDING A SONG TO LIKED LIST
          app.put('/api/users/:userId/likeSong', /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
              var userId, songId, userCollection, updateResult;
              return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.prev = 0;
                    userId = req.params.userId;
                    songId = req.body.songId;
                    if (songId) {
                      _context12.next = 5;
                      break;
                    }
                    return _context12.abrupt("return", res.status(400).send('Song ID is required'));
                  case 5:
                    userCollection = req.db.collection('users');
                    _context12.next = 8;
                    return userCollection.updateOne({
                      _id: new _mongodb.ObjectId(userId)
                    }, {
                      $push: {
                        likedSongs: songId
                      }
                    });
                  case 8:
                    updateResult = _context12.sent;
                    if (!(updateResult.modifiedCount === 0)) {
                      _context12.next = 11;
                      break;
                    }
                    return _context12.abrupt("return", res.status(404).send('User not found or song already liked'));
                  case 11:
                    res.status(200).send('Song added to likedSongs');
                    _context12.next = 18;
                    break;
                  case 14:
                    _context12.prev = 14;
                    _context12.t0 = _context12["catch"](0);
                    console.error('Error liking song:', _context12.t0.message);
                    res.status(500).send('Internal Server Error');
                  case 18:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12, null, [[0, 14]]);
            }));
            return function (_x23, _x24) {
              return _ref12.apply(this, arguments);
            };
          }());

          // LIKING A SONG
          app.post('/api/likes', /*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
              var userId, songId, user;
              return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    _context13.prev = 0;
                    userId = req.userId;
                    songId = req.body.songId;
                    if (songId) {
                      _context13.next = 6;
                      break;
                    }
                    console.error('Song ID is missing in the request');
                    return _context13.abrupt("return", res.status(400).json({
                      success: false,
                      message: 'Song ID is required'
                    }));
                  case 6:
                    _context13.next = 8;
                    return User.findById(userId);
                  case 8:
                    user = _context13.sent;
                    if (user) {
                      _context13.next = 12;
                      break;
                    }
                    console.error("User not found: ".concat(userId));
                    return _context13.abrupt("return", res.status(404).json({
                      success: false,
                      message: 'User not found'
                    }));
                  case 12:
                    if (user.likedSongs.includes(songId)) {
                      _context13.next = 16;
                      break;
                    }
                    user.likedSongs.push(songId);
                    _context13.next = 16;
                    return user.save();
                  case 16:
                    console.log("Song liked: ".concat(songId, " by user: ").concat(userId));
                    return _context13.abrupt("return", res.json({
                      success: true,
                      songId: songId
                    }));
                  case 20:
                    _context13.prev = 20;
                    _context13.t0 = _context13["catch"](0);
                    console.error('Error in /api/likes:', _context13.t0);
                    return _context13.abrupt("return", res.status(500).json({
                      success: false,
                      message: 'Internal server error'
                    }));
                  case 24:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13, null, [[0, 20]]);
            }));
            return function (_x25, _x26) {
              return _ref13.apply(this, arguments);
            };
          }());

          // READ: all songs -- works
          app.get('/api/songs', /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
              var songs;
              return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    _context14.prev = 0;
                    _context14.next = 3;
                    return req.db.collection('songs').find().toArray();
                  case 3:
                    songs = _context14.sent;
                    res.status(200).send(songs);
                    _context14.next = 10;
                    break;
                  case 7:
                    _context14.prev = 7;
                    _context14.t0 = _context14["catch"](0);
                    res.status(500).send("Error fetching songs");
                  case 10:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14, null, [[0, 7]]);
            }));
            return function (_x27, _x28) {
              return _ref14.apply(this, arguments);
            };
          }());

          // CREATE SONG NEW
          app.post('/api/songs', /*#__PURE__*/function () {
            var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
              var _req$body4, title, artist, duration, link, date, songCollection, newSong, result;
              return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                while (1) switch (_context15.prev = _context15.next) {
                  case 0:
                    _context15.prev = 0;
                    _req$body4 = req.body, title = _req$body4.title, artist = _req$body4.artist, duration = _req$body4.duration, link = _req$body4.link, date = _req$body4.date;
                    songCollection = req.db.collection('songs');
                    newSong = {
                      title: title,
                      artist: artist,
                      duration: duration,
                      link: link,
                      date: date
                    };
                    _context15.next = 6;
                    return songCollection.insertOne(newSong);
                  case 6:
                    result = _context15.sent;
                    res.status(201).json(result.insertedId);
                    _context15.next = 14;
                    break;
                  case 10:
                    _context15.prev = 10;
                    _context15.t0 = _context15["catch"](0);
                    console.error('Error inserting song:', _context15.t0.message);
                    res.status(500).send('Internal Server Error');
                  case 14:
                  case "end":
                    return _context15.stop();
                }
              }, _callee15, null, [[0, 10]]);
            }));
            return function (_x29, _x30) {
              return _ref15.apply(this, arguments);
            };
          }());

          // READ: specific song 
          app.get('/api/songs/:id', /*#__PURE__*/function () {
            var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
              var id, song;
              return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                while (1) switch (_context16.prev = _context16.next) {
                  case 0:
                    id = req.params.id;
                    _context16.prev = 1;
                    _context16.next = 4;
                    return req.db.collection('songs').findOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 4:
                    song = _context16.sent;
                    if (song) {
                      _context16.next = 7;
                      break;
                    }
                    return _context16.abrupt("return", res.status(404).send("Song not found"));
                  case 7:
                    res.status(200).send(song);
                    _context16.next = 13;
                    break;
                  case 10:
                    _context16.prev = 10;
                    _context16.t0 = _context16["catch"](1);
                    res.status(500).send("Error fetching song (song may not exist)");
                  case 13:
                  case "end":
                    return _context16.stop();
                }
              }, _callee16, null, [[1, 10]]);
            }));
            return function (_x31, _x32) {
              return _ref16.apply(this, arguments);
            };
          }());

          // UPDATE: specific song
          app.put('/api/songs/:id', /*#__PURE__*/function () {
            var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
              var id, _req$body5, title, artist, duration, result;
              return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                while (1) switch (_context17.prev = _context17.next) {
                  case 0:
                    id = req.params.id;
                    _req$body5 = req.body, title = _req$body5.title, artist = _req$body5.artist, duration = _req$body5.duration;
                    _context17.prev = 2;
                    _context17.next = 5;
                    return req.db.collection('songs').updateOne({
                      _id: new _mongodb.ObjectId(id)
                    }, {
                      $set: {
                        title: title,
                        artist: artist,
                        duration: duration
                      }
                    });
                  case 5:
                    result = _context17.sent;
                    if (!(result.modifiedCount === 0)) {
                      _context17.next = 8;
                      break;
                    }
                    return _context17.abrupt("return", res.status(404).send("Song not found or no changes made"));
                  case 8:
                    res.status(200).send("Song updated successfully");
                    _context17.next = 14;
                    break;
                  case 11:
                    _context17.prev = 11;
                    _context17.t0 = _context17["catch"](2);
                    res.status(500).send("Error updating song");
                  case 14:
                  case "end":
                    return _context17.stop();
                }
              }, _callee17, null, [[2, 11]]);
            }));
            return function (_x33, _x34) {
              return _ref17.apply(this, arguments);
            };
          }());

          // DELETE: specific song
          app["delete"]('/api/songs/:id', /*#__PURE__*/function () {
            var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
              var id, result;
              return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                while (1) switch (_context18.prev = _context18.next) {
                  case 0:
                    id = req.params.id;
                    _context18.prev = 1;
                    _context18.next = 4;
                    return req.db.collection('songs').deleteOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 4:
                    result = _context18.sent;
                    if (!(result.deletedCount === 0)) {
                      _context18.next = 7;
                      break;
                    }
                    return _context18.abrupt("return", res.status(404).send("Song not found"));
                  case 7:
                    res.status(200).send("Song deleted successfully");
                    _context18.next = 13;
                    break;
                  case 10:
                    _context18.prev = 10;
                    _context18.t0 = _context18["catch"](1);
                    res.status(500).send("Error deleting song");
                  case 13:
                  case "end":
                    return _context18.stop();
                }
              }, _callee18, null, [[1, 10]]);
            }));
            return function (_x35, _x36) {
              return _ref18.apply(this, arguments);
            };
          }());

          // -----------------------------------------------------------------------------------------
          // -----------------------------------------------------------------------------------------

          // LOGIN
          app.post('/api/login', /*#__PURE__*/function () {
            var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
              var _req$body6, username, password, userCollection, user;
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    _req$body6 = req.body, username = _req$body6.username, password = _req$body6.password;
                    _context19.prev = 1;
                    userCollection = req.db.collection('users');
                    _context19.next = 5;
                    return userCollection.findOne({
                      username: username
                    });
                  case 5:
                    user = _context19.sent;
                    if (user) {
                      _context19.next = 8;
                      break;
                    }
                    return _context19.abrupt("return", res.status(404).send('User not found'));
                  case 8:
                    if (!(user.password !== password)) {
                      _context19.next = 10;
                      break;
                    }
                    return _context19.abrupt("return", res.status(401).send('Invalid password'));
                  case 10:
                    req.session.user = {
                      _id: user._id,
                      username: user.username
                    };
                    res.status(200).json(user);
                    _context19.next = 17;
                    break;
                  case 14:
                    _context19.prev = 14;
                    _context19.t0 = _context19["catch"](1);
                    res.status(500).send('Error logging in');
                  case 17:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19, null, [[1, 14]]);
            }));
            return function (_x37, _x38) {
              return _ref19.apply(this, arguments);
            };
          }());

          // CREATE: SIGNUP
          app.post('/api/users', /*#__PURE__*/function () {
            var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
              var _req$body7, username, password, followerCount, userCollection, existingUser, newUser, result;
              return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                while (1) switch (_context20.prev = _context20.next) {
                  case 0:
                    _context20.prev = 0;
                    _req$body7 = req.body, username = _req$body7.username, password = _req$body7.password, followerCount = _req$body7.followerCount;
                    userCollection = req.db.collection('users');
                    _context20.next = 5;
                    return userCollection.findOne({
                      username: username
                    });
                  case 5:
                    existingUser = _context20.sent;
                    if (!existingUser) {
                      _context20.next = 8;
                      break;
                    }
                    return _context20.abrupt("return", res.status(400).send('Username already exists.'));
                  case 8:
                    newUser = {
                      username: username,
                      password: password,
                      followerCount: followerCount
                    };
                    _context20.next = 11;
                    return userCollection.insertOne(newUser);
                  case 11:
                    result = _context20.sent;
                    res.status(201).json(result.insertedId);
                    _context20.next = 19;
                    break;
                  case 15:
                    _context20.prev = 15;
                    _context20.t0 = _context20["catch"](0);
                    console.error('Error inserting user:', _context20.t0.message);
                    res.status(500).send('Internal Server Error');
                  case 19:
                  case "end":
                    return _context20.stop();
                }
              }, _callee20, null, [[0, 15]]);
            }));
            return function (_x39, _x40) {
              return _ref20.apply(this, arguments);
            };
          }());

          // LOGOUT 
          app.post('/api/logout', function (req, res) {
            req.session.destroy(function (err) {
              if (err) {
                return res.status(500).send('Logout failed');
              }
              res.status(200).send('Logged out successfully');
            });
          });

          // --------------------------------------------------------------------------------------------------------
          // HOME PAGE 

          // SEARCH: updated version
          app.get('/api/search', /*#__PURE__*/function () {
            var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
              var searchTerm, playlists, songs, users, results;
              return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                while (1) switch (_context21.prev = _context21.next) {
                  case 0:
                    searchTerm = req.query.q;
                    console.log('Search term:', searchTerm);
                    _context21.prev = 2;
                    if (searchTerm) {
                      _context21.next = 5;
                      break;
                    }
                    return _context21.abrupt("return", res.status(400).json({
                      error: 'No search term provided'
                    }));
                  case 5:
                    _context21.next = 7;
                    return req.db.collection('playlists').find({
                      $or: [{
                        name: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }, {
                        genre: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }, {
                        hashtags: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }]
                    }).toArray();
                  case 7:
                    playlists = _context21.sent;
                    _context21.next = 10;
                    return req.db.collection('songs').find({
                      $or: [{
                        title: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }, {
                        hashtags: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }]
                    }).toArray();
                  case 10:
                    songs = _context21.sent;
                    _context21.next = 13;
                    return req.db.collection('users').find({
                      $or: [{
                        username: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }, {
                        bio: {
                          $regex: searchTerm,
                          $options: 'i'
                        }
                      }]
                    }).toArray();
                  case 13:
                    users = _context21.sent;
                    results = [].concat(_toConsumableArray(playlists), _toConsumableArray(songs), _toConsumableArray(users));
                    res.json(results);
                    _context21.next = 22;
                    break;
                  case 18:
                    _context21.prev = 18;
                    _context21.t0 = _context21["catch"](2);
                    console.error('Search error:', _context21.t0);
                    res.status(500).json({
                      error: 'An error occurred during search'
                    });
                  case 22:
                  case "end":
                    return _context21.stop();
                }
              }, _callee21, null, [[2, 18]]);
            }));
            return function (_x41, _x42) {
              return _ref21.apply(this, arguments);
            };
          }());

          // SONG FEED COMPONENT 
          app.get('/api/songs/:id', /*#__PURE__*/function () {
            var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
              var songId, song;
              return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                while (1) switch (_context22.prev = _context22.next) {
                  case 0:
                    songId = req.params.id;
                    _context22.prev = 1;
                    _context22.next = 4;
                    return req.db.collection('songs').findOne({
                      _id: new _mongodb.ObjectId(songId)
                    });
                  case 4:
                    song = _context22.sent;
                    if (song) {
                      res.json(song);
                    } else {
                      res.status(404).json({
                        error: 'Song not found'
                      });
                    }
                    _context22.next = 12;
                    break;
                  case 8:
                    _context22.prev = 8;
                    _context22.t0 = _context22["catch"](1);
                    console.error('Error fetching song:', _context22.t0);
                    res.status(500).json({
                      error: 'An error occurred while fetching the song'
                    });
                  case 12:
                  case "end":
                    return _context22.stop();
                }
              }, _callee22, null, [[1, 8]]);
            }));
            return function (_x43, _x44) {
              return _ref22.apply(this, arguments);
            };
          }());

          // Get the liked songs for a specific user by user ID
          app.get('/api/users/:id/likedSongs', /*#__PURE__*/function () {
            var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
              var userId, userCollection, user, likedSongIds, songCollection, likedSongs;
              return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    _context23.prev = 0;
                    userId = req.params.id;
                    userCollection = req.db.collection('users');
                    _context23.next = 5;
                    return userCollection.findOne({
                      _id: new _mongodb.ObjectId(userId)
                    });
                  case 5:
                    user = _context23.sent;
                    if (user) {
                      _context23.next = 8;
                      break;
                    }
                    return _context23.abrupt("return", res.status(404).send('User not found'));
                  case 8:
                    likedSongIds = user.likedSongs || [];
                    if (!(likedSongIds.length === 0)) {
                      _context23.next = 11;
                      break;
                    }
                    return _context23.abrupt("return", res.json({
                      likedSongs: []
                    }));
                  case 11:
                    songCollection = req.db.collection('songs');
                    _context23.next = 14;
                    return songCollection.find({
                      _id: {
                        $in: likedSongIds.map(function (id) {
                          return new _mongodb.ObjectId(id);
                        })
                      }
                    }).toArray();
                  case 14:
                    likedSongs = _context23.sent;
                    res.json({
                      likedSongs: likedSongs
                    });
                    _context23.next = 22;
                    break;
                  case 18:
                    _context23.prev = 18;
                    _context23.t0 = _context23["catch"](0);
                    console.error('Error fetching liked songs:', _context23.t0);
                    res.status(500).send('Internal Server Error');
                  case 22:
                  case "end":
                    return _context23.stop();
                }
              }, _callee23, null, [[0, 18]]);
            }));
            return function (_x45, _x46) {
              return _ref23.apply(this, arguments);
            };
          }());

          // -------------------------------------------------------------------------------------------------
          // -------------------------------------------------------------------------------------------------
          // PROFILE PAGE 

          // profile picture
          app.post('/api/user/updateProfilePicture', /*#__PURE__*/function () {
            var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
              var _req$body8, userId, profilePicture, user;
              return _regeneratorRuntime().wrap(function _callee24$(_context24) {
                while (1) switch (_context24.prev = _context24.next) {
                  case 0:
                    _req$body8 = req.body, userId = _req$body8.userId, profilePicture = _req$body8.profilePicture;
                    _context24.prev = 1;
                    _context24.next = 4;
                    return User.findById(userId);
                  case 4:
                    user = _context24.sent;
                    if (user) {
                      _context24.next = 7;
                      break;
                    }
                    return _context24.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 7:
                    user.profilePicture = profilePicture;
                    _context24.next = 10;
                    return user.save();
                  case 10:
                    res.status(200).json({
                      message: 'Profile picture updated successfully'
                    });
                    _context24.next = 17;
                    break;
                  case 13:
                    _context24.prev = 13;
                    _context24.t0 = _context24["catch"](1);
                    console.error('Error updating profile picture:', _context24.t0);
                    res.status(500).json({
                      message: 'Internal server error'
                    });
                  case 17:
                  case "end":
                    return _context24.stop();
                }
              }, _callee24, null, [[1, 13]]);
            }));
            return function (_x47, _x48) {
              return _ref24.apply(this, arguments);
            };
          }());

          // friend requests for non-followed friends
          app.post('/api/get-potential-friends', /*#__PURE__*/function () {
            var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
              var followings, potentialFriends;
              return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                while (1) switch (_context25.prev = _context25.next) {
                  case 0:
                    followings = req.body.followings;
                    _context25.prev = 1;
                    _context25.next = 4;
                    return db.collection('users').find({
                      _id: {
                        $nin: followings.map(function (id) {
                          return new _mongodb.ObjectId(id);
                        })
                      }
                    }).toArray();
                  case 4:
                    potentialFriends = _context25.sent;
                    res.json(potentialFriends);
                    _context25.next = 12;
                    break;
                  case 8:
                    _context25.prev = 8;
                    _context25.t0 = _context25["catch"](1);
                    console.error('Error fetching potential friends:', _context25.t0);
                    res.status(500).json({
                      error: 'Error fetching potential friends'
                    });
                  case 12:
                  case "end":
                    return _context25.stop();
                }
              }, _callee25, null, [[1, 8]]);
            }));
            return function (_x49, _x50) {
              return _ref25.apply(this, arguments);
            };
          }());

          // GET /api/users/:id
          app.get('/api/users/:id', /*#__PURE__*/function () {
            var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res) {
              var userId, user;
              return _regeneratorRuntime().wrap(function _callee26$(_context26) {
                while (1) switch (_context26.prev = _context26.next) {
                  case 0:
                    userId = req.params.id;
                    _context26.prev = 1;
                    _context26.next = 4;
                    return User.findById(userId).select('username pronouns followerCount bio followings createdPlaylists').populate('createdPlaylists');
                  case 4:
                    user = _context26.sent;
                    if (user) {
                      _context26.next = 7;
                      break;
                    }
                    return _context26.abrupt("return", res.status(404).json({
                      message: 'User not found'
                    }));
                  case 7:
                    res.json(user);
                    _context26.next = 14;
                    break;
                  case 10:
                    _context26.prev = 10;
                    _context26.t0 = _context26["catch"](1);
                    console.error('Error fetching user data:', _context26.t0);
                    res.status(500).json({
                      message: 'Server error'
                    });
                  case 14:
                  case "end":
                    return _context26.stop();
                }
              }, _callee26, null, [[1, 10]]);
            }));
            return function (_x51, _x52) {
              return _ref26.apply(this, arguments);
            };
          }());

          // PUT /api/users/:userId/unfollow
          app.put('/api/users/:userId/unfollow', /*#__PURE__*/function () {
            var _ref27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
              var unfollowUserId, user;
              return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                while (1) switch (_context27.prev = _context27.next) {
                  case 0:
                    _context27.prev = 0;
                    unfollowUserId = req.body.unfollowUserId;
                    _context27.next = 4;
                    return User.findByIdAndUpdate(req.params.userId, {
                      $pull: {
                        followings: unfollowUserId
                      }
                    }, {
                      "new": true
                    });
                  case 4:
                    user = _context27.sent;
                    if (user) {
                      _context27.next = 7;
                      break;
                    }
                    return _context27.abrupt("return", res.status(404).json({
                      error: 'User not found'
                    }));
                  case 7:
                    res.json(user);
                    _context27.next = 14;
                    break;
                  case 10:
                    _context27.prev = 10;
                    _context27.t0 = _context27["catch"](0);
                    console.error('Error unfollowing user:', _context27.t0);
                    res.status(500).json({
                      error: 'Failed to unfollow user'
                    });
                  case 14:
                  case "end":
                    return _context27.stop();
                }
              }, _callee27, null, [[0, 10]]);
            }));
            return function (_x53, _x54) {
              return _ref27.apply(this, arguments);
            };
          }());

          // *********************************************************************************

          // Update bio and pronouns
          app.put('/api/users/:id', /*#__PURE__*/function () {
            var _ref28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
              var id, _req$body9, bio, pronouns;
              return _regeneratorRuntime().wrap(function _callee28$(_context28) {
                while (1) switch (_context28.prev = _context28.next) {
                  case 0:
                    id = req.params.id;
                    _req$body9 = req.body, bio = _req$body9.bio, pronouns = _req$body9.pronouns;
                    _context28.prev = 2;
                    _context28.next = 5;
                    return req.db.collection('users').updateOne({
                      _id: new _mongodb.ObjectId(id)
                    }, {
                      $set: {
                        bio: bio,
                        pronouns: pronouns
                      }
                    });
                  case 5:
                    res.status(200).send("User details updated successfully.");
                    _context28.next = 11;
                    break;
                  case 8:
                    _context28.prev = 8;
                    _context28.t0 = _context28["catch"](2);
                    res.status(500).send("Error updating user details.");
                  case 11:
                  case "end":
                    return _context28.stop();
                }
              }, _callee28, null, [[2, 8]]);
            }));
            return function (_x55, _x56) {
              return _ref28.apply(this, arguments);
            };
          }());
          app.put('/api/users/:id/password', /*#__PURE__*/function () {
            var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
              var id, _req$body10, oldPassword, newPassword, user;
              return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                while (1) switch (_context29.prev = _context29.next) {
                  case 0:
                    id = req.params.id;
                    _req$body10 = req.body, oldPassword = _req$body10.oldPassword, newPassword = _req$body10.newPassword;
                    _context29.prev = 2;
                    _context29.next = 5;
                    return req.db.collection('users').findOne({
                      _id: new _mongodb.ObjectId(id)
                    });
                  case 5:
                    user = _context29.sent;
                    if (!(user && user.password === oldPassword)) {
                      _context29.next = 12;
                      break;
                    }
                    _context29.next = 9;
                    return req.db.collection('users').updateOne({
                      _id: new _mongodb.ObjectId(id)
                    }, {
                      $set: {
                        password: newPassword
                      }
                    });
                  case 9:
                    res.status(200).send("Password updated successfully.");
                    _context29.next = 13;
                    break;
                  case 12:
                    res.status(400).send("Old password does not match.");
                  case 13:
                    _context29.next = 18;
                    break;
                  case 15:
                    _context29.prev = 15;
                    _context29.t0 = _context29["catch"](2);
                    res.status(500).send("Error updating password.");
                  case 18:
                  case "end":
                    return _context29.stop();
                }
              }, _callee29, null, [[2, 15]]);
            }));
            return function (_x57, _x58) {
              return _ref29.apply(this, arguments);
            };
          }());

          // GET: user profile by username
          app.get('/api/users', /*#__PURE__*/function () {
            var _ref30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
              var username, userCollection, user, password, userData;
              return _regeneratorRuntime().wrap(function _callee30$(_context30) {
                while (1) switch (_context30.prev = _context30.next) {
                  case 0:
                    _context30.prev = 0;
                    username = req.query.username;
                    userCollection = req.db.collection('users');
                    _context30.next = 5;
                    return userCollection.findOne({
                      username: username
                    });
                  case 5:
                    user = _context30.sent;
                    if (user) {
                      _context30.next = 8;
                      break;
                    }
                    return _context30.abrupt("return", res.status(404).send('User not found'));
                  case 8:
                    password = user.password, userData = _objectWithoutProperties(user, _excluded);
                    res.json(userData);
                    _context30.next = 16;
                    break;
                  case 12:
                    _context30.prev = 12;
                    _context30.t0 = _context30["catch"](0);
                    console.error('Error fetching user:', _context30.t0);
                    res.status(500).send('Internal Server Error');
                  case 16:
                  case "end":
                    return _context30.stop();
                }
              }, _callee30, null, [[0, 12]]);
            }));
            return function (_x59, _x60) {
              return _ref30.apply(this, arguments);
            };
          }());

          // Start server
          app.listen(port, function () {
            console.log("Listening at http://localhost:".concat(port));
          });
          _context31.next = 44;
          break;
        case 40:
          _context31.prev = 40;
          _context31.t0 = _context31["catch"](0);
          console.error("Failed to connect to MongoDB", _context31.t0);
          process.exit(1);
        case 44:
        case "end":
          return _context31.stop();
      }
    }, _callee31, null, [[0, 40]]);
  }));
  return _startServer.apply(this, arguments);
}
startServer();