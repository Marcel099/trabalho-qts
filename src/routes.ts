import express from 'express';

import { OngController } from './controllers/OngController';

const routes = express.Router()
const ongController = new OngController

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)
routes.put('/ongs', ongController.update)
routes.delete('/ongs', ongController.delete)


export { routes }
