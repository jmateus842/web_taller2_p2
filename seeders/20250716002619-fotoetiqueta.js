'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    let [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

    // Create more comprehensive tag assignments for all photos
    await queryInterface.bulkInsert('fotoetiquetas', [
      // Photo 1 (Black Hole) - Space related tags
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[0].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }, // payaso
      
      // Photo 2 (Sunrise) - Light and color tags
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }, // payaso
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[2].id, createdAt: new Date(), updatedAt: new Date() }, // rojo
      { foto_id: fotos[1].id, etiqueta_id: etiquetas[6].id, createdAt: new Date(), updatedAt: new Date() }, // foco
      
      // Photo 3 (Galaxy) - Space and light tags
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[5].id, createdAt: new Date(), updatedAt: new Date() }, // cielo
      { foto_id: fotos[2].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }, // luz
      
      // Photo 4 (Mountains) - Nature and color tags
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[3].id, createdAt: new Date(), updatedAt: new Date() }, // azul
      { foto_id: fotos[3].id, etiqueta_id: etiquetas[4].id, createdAt: new Date(), updatedAt: new Date() }, // techo
      
      // Photo 5 (Golden Sun) - Light and color tags
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[2].id, createdAt: new Date(), updatedAt: new Date() }, // rojo
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[6].id, createdAt: new Date(), updatedAt: new Date() }, // foco
      { foto_id: fotos[4].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }, // luz
      
      // Photo 6 (Lighthouse) - Structure and light tags
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() }, // foto
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[4].id, createdAt: new Date(), updatedAt: new Date() }, // techo
      { foto_id: fotos[5].id, etiqueta_id: etiquetas[7].id, createdAt: new Date(), updatedAt: new Date() }  // luz
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotoetiquetas', null, {});
  }
};
