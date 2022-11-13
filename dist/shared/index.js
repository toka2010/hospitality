"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const development_env_1 = require("./configurations/environments/development-env");
const environmentFactory = (env) => (Object.assign({}, development_env_1.developmentEnv));
exports.default = () => environmentFactory;
//# sourceMappingURL=index.js.map