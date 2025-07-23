const { foto, etiqueta } = require('../models');
const { Op } = require('sequelize');

/**
 * Servicio para manejar las operaciones del modelo Foto
 */
class FotoService {
  /**
   * Encuentra todas las fotos con sus etiquetas asociadas
   * @returns {Promise<Array>} Promesa que resuelve en un arreglo de fotos
   */
  async findAll() {
    try {
      return await foto.findAll({
        // Seleccionar explicitamente solo las columnas necesarias
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        // Ordenar por las mas recientes primero
        order: [['createdAt', 'DESC']],
        // Incluir etiquetas asociadas con configuracion optimizada
        include: [{
          model: etiqueta,
          // Seleccionar solo los atributos necesarios de la etiqueta
          attributes: ['id', 'texto'],
          // Excluir todos los atributos de la tabla intermedia para una respuesta mas limpia
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  /**
   * Encuentra una foto por su llave primaria (ID)
   * @param {number|string} id - El ID de la foto a buscar
   * @returns {Promise<Object|null>} Promesa que resuelve en la foto o null si no se encuentra
   */
  async findById(id) {
    try {
      return await foto.findByPk(id, {
        // Seleccionar explicitamente solo las columnas necesarias
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        // Incluir etiquetas asociadas con configuracion optimizada
        include: [{
          model: etiqueta,
          // Seleccionar solo los atributos necesarios de la etiqueta
          attributes: ['id', 'texto'],
          // Excluir todos los atributos de la tabla intermedia para una respuesta mas limpia
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error(`Error in findById (${id}):`, error);
      throw error;
    }
  }

  /**
   * Encuentra fotos con tags especificos
   * @param {Array<number|string>} tagIds - Arreglo de IDs de tags para filtrar
   * @returns {Promise<Array>} Promesa que resuelve en un arreglo de fotos que coinciden
   */
  async findByTags(tagIds) {
    try {
      return await foto.findAll({
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        include: [{
          model: etiqueta,
          attributes: ['id', 'texto'],
          // Incluir solo las fotos que tengan TODOS los tags especificados
          where: {
            id: {
              [Op.in]: tagIds
            }
          },
          // Excluir datos de la tabla intermedia
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error(`Error in findByTags:`, error);
      throw error;
    }
  }

  /**
   * Busca fotos por un termino de texto contenido en titulo o descripcion (no sensible a mayusculas)
   * @param {string} term - Cadena de busqueda
   * @returns {Promise<Array>} Arreglo de fotos que coinciden
   */
  async searchByText(term) {
    try {
      return await foto.findAll({
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        where: {
          [Op.or]: [
            { titulo: { [Op.like]: `%${term}%` } },
            { descripcion: { [Op.like]: `%${term}%` } }
          ]
        },
        include: [{
          model: etiqueta,
          attributes: ['id', 'texto'],
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error(`Error in searchByText ("${term}"):` , error);
      throw error;
    }
  }
}

module.exports = new FotoService(); 