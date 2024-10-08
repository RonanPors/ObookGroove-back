import * as changeKeys from 'change-case/keys';

class CoreDatamapper {

  tableName;

  constructor(client) {
    this.client = client;
  }

  async count() {

    const { count } = await this.client.from(this.tableName)
      .first()
      .count('* as count');
    return count;

  }

  /**
   * Récupérer un enregistrement à partir d'une clé spécifique
   * @param {string} key - Chaîne de caractères étant le nom de la colonne cible en respectant la casse
   * @param {*} value - Valeur associée à la clé pour complèter la condition (where)
   * @returns {Promise<Object>} - L'objet trouvé suivre à la requête SQL
   */
  async findByKey(key, value) {

    //! mettre la valeur de 'key' entre [] va permettre de nommé la propriété comme la valeur de 'key'
    //! Si 'key' est égak à 'email' (string), [key] sera égal à 'email:'
    const row = await this.client.from(this.tableName)
      .where({ [key]: value })
      .first();

    const newRow = changeKeys.camelCase(row);

    return newRow;

  }

  /**
   * Récupérer tous les enregistrements avec des conditions facultatives
   * @param {Object} params - Paramètres optionnels pour filtrer, trier et limiter les résultats
   * @returns {Promise<Array<Object>>} - Liste des objets trouvés
   */
  async findAll(params) {

    // Transformation du where en snake_case
    const where = changeKeys.snakeCase(params?.where);
    const orWhere = changeKeys.snakeCase(params?.orWhere);
    const andWhere = changeKeys.snakeCase(params?.andWhere);

    const query = this.client.from(this.tableName)
      .modify(queryBuild => {
        if (where) queryBuild.where(where);
        if (orWhere) queryBuild.orWhere(orWhere);
        if (andWhere) queryBuild.andWhere(andWhere);
        if (params?.limit) queryBuild.limit(params.limit);
        if (params?.offset) queryBuild.offset(params.offset);
        if (params?.order) queryBuild.orderBy(params.order.column, params.order.direction);
      });


    /*     if (where) query.where(where);

    if (orWhere) query.orWhere(orWhere);

    if (andWhere) query.andWhere(andWhere);

    if (params?.limit) query.limit(params.limit);

    if (params?.offset) query.offset(params.offset);

    if (params?.order) query.orderBy(
      params.order.column,
      params.order.direction,
    ); */

    const rows = await query;

    const newRows = rows.map((row) => changeKeys.camelCase(row));

    return await newRows;

  }

  /**
   * Insérer un nouvel enregistrement dans la base de données
   * @param {Object} inputData - Données à insérer
   * @returns {Promise<Object>} - L'objet inséré avec ses propriétés générées
   */
  async create(inputData) {

    const newInputData = changeKeys.snakeCase(inputData);

    // Le stringify va retirer les propriétés undefined
    const { rows: [row] } = await this.client.raw(`
      SELECT *
      FROM insert_${this.tableName}
      (?)
    `, [JSON.stringify(newInputData)]);

    const newRow = changeKeys.camelCase(row);

    return newRow;

  }

  async update(inputData) {

    const newInputData = changeKeys.snakeCase(inputData);

    // Le stringify va retirer les propriétés undefined
    const { rows: [row] } = await this.client.raw(`
      SELECT *
      FROM update_${this.tableName}
      (?)
    `, [JSON.stringify(newInputData)]);

    const newRow = changeKeys.camelCase(row);

    return newRow;

  }

  async delete(params) {

    const where = changeKeys.snakeCase(params?.where);
    const orWhere = changeKeys.snakeCase(params?.orWhere);
    const andWhere = changeKeys.snakeCase(params?.andWhere);

    const query = this.client.from(this.tableName);

    if (where) query.where(where);

    if (orWhere) query.orWhere(orWhere);

    if (andWhere) query.andWhere(andWhere);

    const rows = await query.del().returning('*');

    const newRows = changeKeys.camelCase(rows);

    return newRows;

  }

}

export default CoreDatamapper;
