var ReactTools = require('react-tools');

module.exports = {
    process: function (src) {

        //console.log(src);

        //return src;

        return ReactTools.transform(src, {
            harmony: true
        });
    }
};