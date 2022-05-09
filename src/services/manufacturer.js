import Manufacturer from '../models/Manufacturer.js';
import logger from '../utilis/logger.js';

/**
 * Get list of manufacturers
 * @returns {Object}
 */

export async function getManufacturers() {
    logger.info('Fetching list of manufacturers');
    const data = await new Manufacturer().getAll();
    return {
        data,
        message: 'List of all manufacturers'
    };
}