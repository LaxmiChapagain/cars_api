import DBModel from './DBModel.js';
/**
 * Model for the 'manufacturers' table
 * 
 * @class Manufacturers
 */

class Manufacturers extends DBModel {
    constructor() {
        super('manufacturers');
    }

}

export default Manufacturers;