'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etiqueta extends Model {
    /**
     * Metodo de ayuda para definir asociaciones.
     * Este metodo no es parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamara este metodo automaticamente.
     */
    static associate(models) {
      models.etiqueta.belongsToMany(models.foto, {
        through: 'fotoetiquetas',
        foreignKey: 'etiqueta_id'
      });
    }
  }
  etiqueta.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'etiqueta',
    tableName: 'etiquetas'
  });
  return etiqueta;
};