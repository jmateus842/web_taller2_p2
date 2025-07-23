'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    let [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

    // Crear asignaciones de tags mas completas para todas las fotos
    await queryInterface.bulkInsert('fotoetiquetas', [
      // Foto 1 (Black Hole) - Tags relacionados con espacio
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }, // payaso
      
      // Foto 2 (Sunrise) - Tags de luz y color
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }, // payaso
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[2].id, createdAt: new Date(), updatedAt: new Date() }, // rojo
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[6].id, createdAt: new Date(), updatedAt: new Date() }, // foco
      
      // Foto 3 (Galaxy) - Tags de espacio y luz
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[5].id, createdAt: new Date(), updatedAt: new Date() }, // cielo
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }, // luz
      
      // Foto 4 (Mountains) - Tags de naturaleza y color
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[3].id, createdAt: new Date(), updatedAt: new Date() }, // azul
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[4].id, createdAt: new Date(), updatedAt: new Date() }, // techo
      
      // Foto 5 (Golden Sun) - Tags de luz y color
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[2].id, createdAt: new Date(), updatedAt: new Date() }, // rojo
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[6].id, createdAt: new Date(), updatedAt: new Date() }, // foco
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }, // luz
      
      // Foto 6 (Lighthouse) - Tags de estructura y luz
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[4].id, createdAt: new Date(), updatedAt: new Date() }, // techo
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }  // luz
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
