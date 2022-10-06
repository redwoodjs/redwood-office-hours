// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/api',
}

if (process.env.DEBUG?.includes('wallaby')) config.runner = 'jest-runner'

module.exports = config
