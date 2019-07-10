const DEVELOPMENT = require('./webpack.const').DEVELOPMENT;
const PRODUCTION = require('./webpack.const').PRODUCTION;

const chooseMode = mode => {
    if (mode === PRODUCTION) {
        console.log(mode, PRODUCTION);
        console.log('Current mode is production!');
        return true;
    } else if (mode === DEVELOPMENT) {
        console.log('Current mode is development!');
        return false;
    } else {
        console.log('Current mode is development!');
        return false;
    }
};

module.exports = chooseMode;
