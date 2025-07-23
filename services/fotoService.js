const { foto, etiqueta } = require('../models');
const { Op } = require('sequelize');

/**
 * Service for handling Foto model operations
 */
class FotoService {
  /**
   * Find all fotos with their associated etiquetas
   * @returns {Promise<Array>} Promise that resolves to an array of fotos
   */
  async findAll() {
    try {
      return await foto.findAll({
        // Explicitly select only the columns we need
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        // Order by most recent first
        order: [['createdAt', 'DESC']],
        // Include associated tags with optimized settings
        include: [{
          model: etiqueta,
          // Select only needed tag attributes
          attributes: ['id', 'texto'],
          // Exclude all join table attributes for a cleaner response
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  /**
   * Find a foto by its primary key (ID)
   * @param {number|string} id - The ID of the foto to find
   * @returns {Promise<Object|null>} Promise that resolves to the foto or null if not found
   */
  async findById(id) {
    try {
      return await foto.findByPk(id, {
        // Explicitly select only the columns we need
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        // Include associated tags with optimized settings
        include: [{
          model: etiqueta,
          // Select only needed tag attributes
          attributes: ['id', 'texto'],
          // Exclude all join table attributes for a cleaner response
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error(`Error in findById (${id}):`, error);
      throw error;
    }
  }

  /**
   * Find fotos with specific tags
   * @param {Array<number|string>} tagIds - Array of tag IDs to filter by
   * @returns {Promise<Array>} Promise that resolves to an array of matching fotos
   */
  async findByTags(tagIds) {
    try {
      return await foto.findAll({
        attributes: ['id', 'titulo', 'ruta', 'descripcion', 'createdAt'],
        include: [{
          model: etiqueta,
          attributes: ['id', 'texto'],
          // Only include photos that have ALL the specified tags
          where: {
            id: {
              [Op.in]: tagIds
            }
          },
          // Exclude join table data
          through: { attributes: [] }
        }]
      });
    } catch (error) {
      console.error(`Error in findByTags:`, error);
      throw error;
    }
  }

  /**
   * Search fotos by a text term contained in titulo or descripcion (case-insensitive)
   * @param {string} term - Search string
   * @returns {Promise<Array>} Array of matching fotos
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