module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        "@app/(.*)": "<rootDir>/src/app/$1",
        "@assets/(.*)": "<rootDir>/src/assets/$1",
        "@modules/(.*)": "<rootDir>/src/modules/$1",
        "@shared/(.*)": "<rootDir>/src/shared/$1",
        "@rtk/(.*)": "<rootDir>/src/rtk/$1",
        "@pages/(.*)": "<rootDir>/src/pages/$1",
        "^.+\\.(css|less|sass|scss)$": "babel-jest"
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.svg$": "jest-transformer-svg"
    }
}