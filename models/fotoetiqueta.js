'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fotoetiqueta extends Model {
    /**
     * Metodo de ayuda para definir asociaciones.
     * Este metodo no es parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamara este metodo automaticamente.
     */
    static associate(models) {
      // definir la asociacion aqui
    }
  }
  fotoetiqueta.init({
    foto_id: DataTypes.INTEGER,
    etiqueta_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fotoetiqueta',
    tableName: 'fotoetiquetas'
  });
  return fotoetiqueta;
};