export const mfConfig = {
  name: "host",
  remotes: {
    remote: "remote@http://localhost:3001/remoteEntry.js",
  },
  exposes: {},
  shared: {
    react: { singleton: true, requiredVersion: false },
    "react-dom": { singleton: true, requiredVersion: false },
    "react-redux": { singleton: true, requiredVersion: false },
    "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
  } as any,
};
