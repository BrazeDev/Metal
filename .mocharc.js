'use strict'

module.exports = {
    require: [
        'ts-node/register/transpile-only',
        'tsconfig-paths/register',
        'scripts/mocha/register'
    ],
    recursive: true,
    reporter: 'mochawesome',
    spec: [
        'src/**/*.spec.ts',
        'test/**/*.spec.ts'
    ],
    file: [
        'scripts/mocha/testdb'
    ]
}