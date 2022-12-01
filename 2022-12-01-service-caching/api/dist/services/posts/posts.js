var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var posts_exports = {};
__export(posts_exports, {
  createPost: () => createPost,
  deletePost: () => deletePost,
  post: () => post,
  posts: () => posts,
  updatePost: () => updatePost
});
module.exports = __toCommonJS(posts_exports);
var import_promise = __toESM(require("@babel/runtime-corejs3/core-js/promise"));
var import_set_timeout = __toESM(require("@babel/runtime-corejs3/core-js/set-timeout"));
var import_cache = require("../../lib/cache");
var import_db = require("../../lib/db");
function delay(ms) {
  return new import_promise.default((resolve) => (0, import_set_timeout.default)(resolve, ms));
}
const posts = () => {
  return (0, import_cache.cacheFindMany)(`posts`, import_db.db.post);
};
const post = async ({
  id
}) => {
  return (0, import_cache.cache)(["post", id], async () => {
    await delay(2e3);
    return import_db.db.post.findUnique({
      where: {
        id
      }
    });
  });
};
const createPost = ({
  input
}) => {
  return import_db.db.post.create({
    data: input
  });
};
const updatePost = ({
  id,
  input
}) => {
  return import_db.db.post.update({
    data: input,
    where: {
      id
    }
  });
};
const deletePost = ({
  id
}) => {
  return import_db.db.post.delete({
    where: {
      id
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost,
  deletePost,
  post,
  posts,
  updatePost
});
//# sourceMappingURL=posts.js.map
