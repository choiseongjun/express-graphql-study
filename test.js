const { db } = require("./pgAdaptor");

db.one('select * from test.users')
    .then(res => {
        console.log(res);
    });