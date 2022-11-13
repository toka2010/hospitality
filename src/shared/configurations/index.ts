import { developmentEnv } from "./environments/development-env";
const environmentFactory = (env: Record<string, any>) => ({
  ...developmentEnv,
});

export default () => environmentFactory(developmentEnv);
