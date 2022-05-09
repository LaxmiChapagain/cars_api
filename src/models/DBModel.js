import connection from "../knexfile.js";
import camelize from 'camelize';
import snakeize from "snakeize";

/**
 * Base model for that an be used for all tables
 * 
 * @class DBModel
 */

class DBModel {
    constructor(table) {
        this.table = table;
        this.connection = connection;
        // this.db = connection(table); // connection from knexfile  lai table saga bind gareko

    }
    async getAll() {
        // const data = await this.db.select('*');
        const data = await this.connection(this.table).select('*'); // return connection('cars').select('*)  // select * from cars;
        return camelize(data);
    }
    async getById(id) {
        const [data] = await this.connection(this.table).select('*').where('id', id); // return this.db.select('*').where({id}); // for single comparision
        return data ? camelize(data) : null;
    }

    async findByParams(params) {
        const [data] = await this.connection(this.table).select('*').where(snakeize(params));
        return data ? camelize(data) : null;

    }
    async save(data) {
        const result = await this.connection(this.table).insert(snakeize(data)).returning('*');
        return camelize(result);
    }
    async updateById(id, data) {
        const result = await this.connection(this.table).update(snakeize(data)).where({ id }).returning('*');
        return camelize(result); // approach for multiple comparision
    }
    async removeById(id) {
            const result = await this.connection(this.table).delete().where({ id });
            return camelize(result);
        }
        // find by params is used to find data from single table whereas query is used for finding data from multple tables

    async removeByParams(params) {
        const result = await this.connection(this.table).delete().where(snakeize(params));
        return camelize(result);
    }
    async query(sql, params) {
        const result = await this.connection.raw(sql, params);
        return camelize(result.rows);
    }
}

export default DBModel;