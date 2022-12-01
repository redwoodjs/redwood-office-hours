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
var skipAuth_exports = {};
__export(skipAuth_exports, {
  default: () => skipAuth_default,
  schema: () => schema
});
module.exports = __toCommonJS(skipAuth_exports);
var import_graphql_server = require("@redwoodjs/graphql-server");
const schema = {
  "kind": "Document",
  "definitions": [{
    "kind": "DirectiveDefinition",
    "description": {
      "kind": "StringValue",
      "value": "Use to skip authentication checks and allow public access.",
      "block": true
    },
    "name": {
      "kind": "Name",
      "value": "skipAuth"
    },
    "arguments": [],
    "repeatable": false,
    "locations": [{
      "kind": "Name",
      "value": "FIELD_DEFINITION"
    }]
  }],
  "loc": {
    "start": 0,
    "end": 116,
    "source": {
      "body": '\n  """\n  Use to skip authentication checks and allow public access.\n  """\n  directive @skipAuth on FIELD_DEFINITION\n',
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
const skipAuth = (0, import_graphql_server.createValidatorDirective)(schema, () => {
  return;
});
var skipAuth_default = skipAuth;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  schema
});
//# sourceMappingURL=skipAuth.js.map
