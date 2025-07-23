'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foto extends Model {
    /**
     * Metodo de ayuda para definir asociaciones.
     * Este metodo no es parte del ciclo de vida de Sequelize.
     * El archivo `models/index` llamara este metodo automaticamente.
     */
    static associate(models) {
      models.foto.belongsToMany(models.etiqueta, {
        through: 'fotoetiquetas',
        foreignKey: 'foto_id'
      });
    }
  }
  foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'foto',
  });
  return foto;
};