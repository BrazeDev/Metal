const fs = require('fs')
const path = require('path')
const result = require('../mochawesome-report/mochawesome.json')

const output = {
    schemaVersion: 1,
    label: 'tests',
    message: `${result.stats.passes} passed, ${result.stats.failures} failed`,
    color: result.stats.failures > 0 ? 'red' : 'green'
}

fs.writeFileSync(path.join(__dirname, '..', 'mochawesome-report', 'shield.json'), JSON.stringify(output))