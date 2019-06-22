import pool from '../config/db';

class Utils {
  static async util(table, content, request) {
    const find = `SELECT * FROM ${table} WHERE ${content} = $1`;
    const value = request;
    const thing = await pool.query(find, [value]);
    return { thing, value };
  }

  static async priceRange(table, content, request, price, min, max) {
    const find = `SELECT * FROM ${table} WHERE ${content} = $1 AND ${price} >= $2 AND ${price} <= $3`;
    const value = [request, min, max];
    const thing = await pool.query(find, value);
    return { thing, value };
  }
}

export default Utils;
