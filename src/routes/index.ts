import { Router } from 'express';
import shortid from 'shortid';
import { getBase, validateURL } from '../config/utils';
import { UrlModel } from '../models/Url';

const routes = Router();

routes.get('/shorts', async (request, response) => {
    try {
        const shorts = await UrlModel.find()
        response.send(shorts)
    } catch (error) {
        response.status(500).json('Server Error');
    }
})

routes.get('/shorts/:urlId', async (request, response) => {
    try {
        const { urlId } = request.params;
        const shorts = await UrlModel.findOne({ urlId })
        if (!shorts){
            return response.status(400).send({ msg: "Invalid URL." });
        }else{
            response.send(shorts)
        }        
    } catch (error) {
        response.status(500).json('Server Error');
    }
})

routes.post('/short', async (request, response) => {
    const { origUrl } = request.body;
    const urlId = shortid.generate();
    try {
        if (!!validateURL(origUrl))
            return response.status(400).send({ msg: "Invalid URL." });

        let url = await UrlModel.findOne({ origUrl })
        if (url) {
            response.json(url)
        } else {
            const shortUrl = `${getBase()}/${urlId}`;
            url = new UrlModel({
                origUrl,
                shortUrl,
                urlId,
                date: new Date(),
            });

            await url.save();
            response.json(url);
        }
    } catch (error) {
        console.log('error', error)
        response.status(500).json('Server Error');
    }

})

export default routes;