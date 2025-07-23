'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Agrega comandos de seed aqui.
     *
     * Ejemplo:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Agrega comandos para revertir seed aqui.
     *
     * Ejemplo:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
