var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cache_exports = {};
__export(cache_exports, {
  cache: () => cache,
  cacheFindMany: () => cacheFindMany,
  client: () => client
});
module.exports = __toCommonJS(cache_exports);
var import_cache = require("@redwoodjs/api/cache");
var import_logger = require("./logger");
const memJsFormattedLogger = {
  log: (msg) => import_logger.logger.error(msg)
};
let client;
if (process.env.NODE_ENV === "test") {
  client = new import_cache.InMemoryClient();
} else {
  try {
    client = new import_cache.MemcachedClient(process.env.CACHE_HOST, {
      logger: memJsFormattedLogger
    });
  } catch (e) {
    import_logger.logger.error(`Could not connect to cache: ${e.message}`);
  }
}
const {
  cache,
  cacheFindMany
} = (0, import_cache.createCache)(client, {
  logger: import_logger.logger,
  timeout: 500
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cache,
  cacheFindMany,
  client
});
//# sourceMappingURL=cache.js.map
