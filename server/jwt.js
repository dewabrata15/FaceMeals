const jwt = require('jsonwebtoken');

const access_token = jwt.sign({ id: 1 }, 'iproject');
console.log(access_token)

const result = jwt.verify(access_token, 'iproject')
console.log({ result });