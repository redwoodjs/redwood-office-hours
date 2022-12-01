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
var requireAuth_exports = {};
__export(requireAuth_exports, {
  default: () => requireAuth_default,
  schema: () => schema
});
module.exports = __toCommonJS(requireAuth_exports);
var import_graphql_server = require("@redwoodjs/graphql-server");
var import_auth = require("../../lib/auth");
const schema = {
  "kind": "Document",
  "definitions": [{
    "kind": "DirectiveDefinition",
    "description": {
      "kind": "StringValue",
      "value": "Use to check whether or not a user is authenticated and is associated\nwith an optional set of roles.",
      "block": true
    },
    "name": {
      "kind": "Name",
      "value": "requireAuth"
    },
    "arguments": [{
      "kind": "InputValueDefinition",
      "name": {
        "kind": "Name",
        "value": "roles"
      },
      "type": {
        "kind": "ListType",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "String"
          }
        }
      },
      "directives": []
    }],
    "repeatable": false,
    "locations": [{
      "kind": "Name",
      "value": "FIELD_DEFINITION"
    }]
  }],
  "loc": {
    "start": 0,
    "end": 180,
    "source": {
      "body": '\n  """\n  Use to check whether or not a user is authenticated and is associated\n  with an optional set of roles.\n  """\n  directive @requireAuth(roles: [String]) on FIELD_DEFINITION\n',
      "name": "GraphQL request",
      "locationOffset": {
        "line": 1,
        "column": 1
      }
    }
  }
};
const validate = ({
  directiveArgs
}) => {
  const {
    roles
  } = directiveArgs;
  (0, import_auth.requireAuth)({
    roles
  });
};
const requireAuth = (0, import_graphql_server.createValidatorDirective)(schema, validate);
var requireAuth_default = requireAuth;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  schema
});
//# sourceMappingURL=requireAuth.js.map
