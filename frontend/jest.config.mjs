export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.png$": "jest-transform-stub",
  },
  testRegex: "^.+\\.spec\\.tsx?$",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^lodash-es/(.*)$": "lodash/$1",
  },
};
