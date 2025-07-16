'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fotos', [
      {
        titulo: 'Black Hole in Space',
        descripcion: 'A stunning visualization of a black hole in deep space, showing the intense gravitational effects and light distortion around the event horizon.',
        ruta: '/images/black_hole.png',
        createdAt: new Date('2024-06-15'),
        updatedAt: new Date('2024-06-15')
      },
      {
        titulo: 'Beautiful Sunrise',
        descripcion: 'A breathtaking sunrise captured during early morning hours, with warm golden light painting the sky in beautiful orange and pink hues.',
        ruta: '/images/sundawn.jpg',
        createdAt: new Date('2024-07-03'),
        updatedAt: new Date('2024-07-03')
      },
      {
        titulo: 'Galaxy View',
        descripcion: 'An awe-inspiring view of a distant galaxy, showcasing the vastness of space with countless stars and cosmic dust clouds.',
        ruta: '/images/space.jpg',
        createdAt: new Date('2024-05-20'),
        updatedAt: new Date('2024-05-20')
      },
      {
        titulo: 'Mountain Landscape',
        descripcion: 'Majestic mountain peaks covered in snow, creating a dramatic landscape that showcases the raw beauty of nature and geological formations.',
        ruta: '/images/mountains.jpg',
        createdAt: new Date('2024-06-28'),
        updatedAt: new Date('2024-06-28')
      },
      {
        titulo: 'Golden Sun',
        descripcion: 'A brilliant golden sun shining brightly against a clear blue sky, representing warmth, energy, and the life-giving force of our star.',
        ruta: '/images/sun.jpg',
        createdAt: new Date('2024-07-10'),
        updatedAt: new Date('2024-07-10')
      },
      {
        titulo: 'Lighthouse at Dawn',
        descripcion: 'A historic lighthouse standing tall against the early morning light, symbolizing guidance, safety, and maritime heritage.',
        ruta: '/images/faro.png',
        createdAt: new Date('2024-06-05'),
        updatedAt: new Date('2024-06-05')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};
