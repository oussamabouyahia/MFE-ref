export const mfConfig = {
  name: "remote",
  filename: "remoteEntry.js",
  exposes: { "./Button": "./src/Button" },
  shared: {
    react: { singleton: true, requiredVersion: false },
    "react-dom": { singleton: true, requiredVersion: false },
    "react-redux": { singleton: true, requiredVersion: false },
    "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
  } as any,
};
