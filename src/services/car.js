import Car from '../models/Car.js';
import CarImage from '../models/CarImage.js';
import logger from '../utilis/logger.js';

import Boom from '@hapi/boom';

export async function getAllCars(query) {
    const manufacturerId = query.manufacturerId;
    const modelFilter = query.model ? query.model.split(',') : [];

    logger.info('Fetching a list of all cars');

    const cars = await new Car().getAllCars();

    const parsedCars = cars.map((car) => ({
        ...car,
        images: car.images ? car.images.split(',') : []
    }));

    let filteredCars = parsedCars;
    //Searching features
    if (manufacturerId) {
        filteredCars = parsedCars.filter((car) => +manufacturerId === car.manufacturerId);
    }
    if (modelFilter.length) {
        filteredCars = parsedCars.filter((car) => modelFilter.includes(car.model));
    }

    return {
        data: filteredCars,
        message: 'List of Cars',
    };
}

export async function getCar(id) {
    logger.info(`Fetching car with carId ${id}`);

    const car = await new Car().getCarDetails(id);



    if (!car) {
        logger.error(`cannot find car with carId ${id}`);

        throw new Boom.notFound(`cannot find car with carId ${id}`);
    }
    const parsedCar = {
        ...car,
        images: car.images ? car.images.split(',') : []
    };

    return {
        data: parsedCar,
        message: `Details of carId ${id}`,
    };
}

export async function addCar(params) {
    logger.debug('Payload received', params);
    // cars table ko columns ko name
    const carTableInsertParams = {
        manufacturerId: params.manufacturerId,
        model: params.model,
        horsepower: params.horsepower
    };

    const existingData = await new Car().findByParams(carTableInsertParams);

    if (existingData) {
        logger.error('Data with the same payload already exists');
        throw new Boom.badRequest('Data with the same payload already exists');
    }
    logger.info('Saving the new car data');

    const [carTableInsertedData] = await new Car().save(carTableInsertParams);
    if (params.images.length) {
        logger.info('Creating insert data for car_images table')
        const carImagesInsertData = params.images.map(url => ({
            carId: carTableInsertedData.id,
            imageUrl: url
        }));
        logger.info(`Inserting ${carImagesInsertData.length} records into the car_images table`)
        carImagesInsertData.forEach(async(insertData) => {
            await new CarImage().save(insertData);

        });
    }
    logger.info('Retrieving thr saved car details');
    const data = await new Car().getCarDetails(carTableInsertedData.id);
    return {
        data,
        message: 'Added the record successfully',
    };
}

export async function updateCar(id, params) {
    logger.info(`Checking the existence of car with id ${id}`);

    const car = await new Car().getById(id);

    if (!car) {
        logger.error(`Cannot find car with id ${id}`);
        throw new Boom.notFound(`cannot find car with id ${id}`);
    }
    logger.info(`Updating the data for car id  ${id}`);

    await new Car().updateById(id, {
        manufacturerId: params.manufacturerId,
        model: params.model,
        horsepower: params.horsepower
    });

    // If we want to deal with images we have two approaches:
    //1. Using the sane update endpont for car images as well -> Appropriate Handler
    //2.Using a separate endpoint (API) altogether

    if (params.images && params.images.added && params.images.length) {
        params.images.added.forEach(async(url) => {
            await new CarImage().save({ id, imageUrl: url });
        });
    }
    if (params.images && params.images.removed && params.images.length) {
        params.images.removed.forEach(async(url) => {
            await new CarImage().removeByParams({ id, imageUrl: url });
        });
    }


    logger.info(`Fetching  the  updated data for car id  ${id}`);

    const updatedData = await new Car().getCarDetails(id);

    return {
        data: updatedData,
        message: 'Record updated successfully',
    };
}

export async function removeCar(id) {
    logger.info(`Checking if car with id  ${id} exists`);

    const car = await new Car().getById(id);

    if (!car) {
        logger.error(`Cannot delete car with id ${id} because it doesn't exist`);

        throw new Boom.notFound(`Cannot delete car with id ${id} because it doesn't exist`);
    }
    await new CarImage().removeByParams({ carId: id });
    await new Car().removeById(id);

    return {
        message: 'Record removed successfully',
    };
}