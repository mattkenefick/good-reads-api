
import Constants from './constants.js';
import Express from 'express';
import ApiGoodReads from './api/goodreads.js';
import TransformerGoodReads from './transformer/goodreads.js';

const api = new ApiGoodReads(Constants.GOODREADS);


// Create application
// ----------------------------------------------------------------------------

const app = Express();

app.get('/search', async (req, res) => {
    const query = req?.query?.q;
    const page = req?.query?.page;
    let envelope, result;

    // Retrieve results from GoodReads
    result = await api.search(query, page);

    // Convert to returnable envelope
    envelope = new TransformerGoodReads(result).envelope;

    res.send(envelope);
});

app.listen(3030, () => {
	console.log('Server started @ 3030');
});
