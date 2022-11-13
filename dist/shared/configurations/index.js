"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const development_env_1 = require("./environments/development-env");
const environmentFactory = (env) => (Object.assign({}, development_env_1.developmentEnv));
exports.default = () => environmentFactory(development_env_1.developmentEnv);
//# sourceMappingURL=index.js.map