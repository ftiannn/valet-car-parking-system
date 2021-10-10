export default {
  verbose: true,
  testEnvironment: "jest-environment-node",
  transform: {},
  moduleFileExtensions: ["js"],
  testRegex: ".spec.js$",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!<rootDir>/node_modules/"],
};
