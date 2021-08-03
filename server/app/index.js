
import Constants from './constants.js';
import Express from 'express';
import ApiGoodReads from './api/goodreads.js';

const api = new ApiGoodReads(Constants.GOODREADS);
let result;

result = await api.search('Sun also rises');
console.log(result);


// Create application
// ----------------------------------------------------------------------------

// const app = Express();

// app.get('/', (req, res) => {
// 	res.send('Hello Express app!')
// });

// app.listen(3000, () => {
// 	console.log('server started');
// });
