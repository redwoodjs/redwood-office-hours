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
var auth_exports = {};
__export(auth_exports, {
  hasRole: () => hasRole,
  isAuthenticated: () => isAuthenticated,
  requireAuth: () => requireAuth
});
module.exports = __toCommonJS(auth_exports);
const isAuthenticated = () => {
  return true;
};
const hasRole = ({
  roles
}) => {
  return roles !== void 0;
};
const requireAuth = ({
  roles
}) => {
  return isAuthenticated();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasRole,
  isAuthenticated,
  requireAuth
});
//# sourceMappingURL=auth.js.map
