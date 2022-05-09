import { Router } from 'express';

import addCarSchema from './schemas/addCar.js';
import addUserSchema from './schemas/addUser.js';
import updateCarSchema from './schemas/updateCar.js';
import * as apiController from './controllers/api.js';
import * as carController from './controllers/car.js';
import * as userController from './controllers/user.js';
import getCarsQuerySchema from './schemas/getCarsQuery.js';
import * as manufacturerController from './controllers/manufacturer.js';
import { validateBody, validateQueryParams } from './middlewares/validation.js';

const router = Router();

router.get('/', apiController.getAPTDetails);
router.get('/manufacturers', manufacturerController.getManufacturers);

router.get('/cars', validateQueryParams(getCarsQuerySchema), carController.getCars);

router.get('/cars/:carIdentifier', carController.getCar);

router.post('/cars', validateBody(addCarSchema), carController.saveCar);

router.put('/cars/:carIdentifier', validateBody(updateCarSchema), carController.updateCar);

router.delete('/cars/:carIdentifier', carController.removeCar);

router.post('/users', validateBody(addUserSchema), userController.addUser);

export default router;