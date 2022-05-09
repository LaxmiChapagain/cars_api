import DBModel from './DBModel.js';
import getAllCarsQuery from '../db/queries/getAllCars.js';
import getCarDetailsQuery from '../db/queries/gerCarDetail.js';
/**
 * Model for the 'cars' table
 * 
 * @class Car
 */

class Car extends DBModel {
    constructor() {
        super('cars'); // paren mah data pathauna use hunxa. DBModel ko constructor mah 'cars' le data pass gardinxa

    }
    getAllCars() {
            return this.query(getAllCarsQuery);

        }
        // Using Knex query Builder
        // getCars() {
        //     const data = await this.connection.queryBuilder().select(['c.id',
        //             ' c.manufacturer_id',
        //             'm.name AS manufacturer_name', 'STRING_AGG(ci.image_url, ', ') AS images'
        //         ])
        //         .from('cars  AS c')
        //         .innerJoin('manufacturers  AS m', 'm.id', 'c.manufacturer_id')
        //         .leftJoin('car_images AS ci', 'ci.car_id', 'c.id')
        //         .groupBy('c.id', 'c.manufacturer_id', 'm.name', 'c.model', ' c.horsepower', 'c.created_at');

    // }
    async getCarDetails(carId) {
        const details = await this.query(getCarDetailsQuery, { carId });
        return details[0] || null;
    }
}

export default Car;