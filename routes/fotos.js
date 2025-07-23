var express = require('express');
var router = express.Router();
const fotoService = require('../services/fotoService');

router.get('/findAll/json', function(req, res, next) {
  fotoService.findAll()
    .then(fotos => res.json(fotos))
    .catch(error => {
      console.error('Error fetching all photos:', error);
      res.status(500).json({ error: 'Error al obtener las fotos' });
    });
});

router.get('/findAll/view', function(req, res, next) {
  fotoService.findAll()
    .then(fotos => res.render('fotos', { title: 'Fotos', arrFotos: fotos }))
    .catch(error => {
      console.error('Error fetching all photos for view:', error);
      res.status(500).render('error', { message: 'Error al obtener las fotos' });
    });
});

// Nueva ruta para consultar una foto por ID y devolver JSON
router.get('/find/:id/json', function(req, res, next) {
  const id = req.params.id;
  
  fotoService.findById(id)
    .then(foto => {
      if (foto) {
        res.json(foto);
      } else {
        res.status(404).json({ error: 'Foto no encontrada' });
      }
    })
    .catch(error => {
      console.error(`Error fetching photo ${id}:`, error);
      res.status(500).json({ error: 'Error al obtener la foto' });
    });
});

// Nueva ruta para consultar una foto por ID y renderizar vista
router.get('/find/:id/view', function(req, res, next) {
  const id = req.params.id;
  
  fotoService.findById(id)
    .then(foto => {
      if (foto) {
        res.render('fotos', { title: 'Detalle de Foto', arrFotos: [foto] });
      } else {
        res.status(404).render('error', { message: 'Foto no encontrada' });
      }
    })
    .catch(error => {
      console.error(`Error fetching photo ${id} for view:`, error);
      res.status(500).render('error', { message: 'Error al obtener la foto' });
    });
});

// Nueva ruta para buscar fotos por etiquetas
router.get('/findByTags', function(req, res, next) {
  const tagIds = req.query.tags;
  
  // Si no hay tags, redirigir a findAll
  if (!tagIds) {
    return res.redirect('/fotos/findAll/json');
  }
  
  // Convertir a array si es un solo ID
  const tags = Array.isArray(tagIds) ? tagIds : [tagIds];
  
  fotoService.findByTags(tags)
    .then(fotos => {
      res.json(fotos);
    })
    .catch(error => {
      console.error('Error fetching photos by tags:', error);
      res.status(500).json({ error: 'Error al obtener las fotos por etiquetas' });
    });
});

// Nueva ruta para buscar fotos por etiquetas y renderizar vista
router.get('/findByTags/view', function(req, res, next) {
  const tagIds = req.query.tags;
  
  // Si no hay tags, redirigir a findAll view
  if (!tagIds) {
    return res.redirect('/fotos/findAll/view');
  }
  
  // Convertir a array si es un solo ID
  const tags = Array.isArray(tagIds) ? tagIds : [tagIds];
  
  fotoService.findByTags(tags)
    .then(fotos => {
      res.render('fotos', { 
        title: 'Fotos por Etiquetas', 
        arrFotos: fotos,
        selectedTags: tags 
      });
    })
    .catch(error => {
      console.error('Error fetching photos by tags for view:', error);
      res.status(500).render('error', { message: 'Error al obtener las fotos por etiquetas' });
    });
});

router.get('/search/json', function(req, res, next) {
  const term = req.query.term;
  if (!term) {
    // No term provided; redirect to all fotos json
    return res.redirect('/fotos/findAll/json');
  }
  // Si el termino es numerico intentar buscar por ID primero
  if (/^\d+$/.test(term)) {
    return fotoService.findById(parseInt(term, 10))
      .then(foto => {
        if (foto) {
          return res.json([foto]);
        }
        // Si no se encuentra, continuar con la busqueda por texto
        return fotoService.searchByText(term)
          .then(fotos => res.json(fotos));
      })
      .catch(error => {
        console.error('Error searching photo by ID:', error);
        res.status(500).json({ error: 'Error al buscar la foto' });
      });
  }

  // Busqueda por texto por defecto
  fotoService.searchByText(term)
    .then(fotos => res.json(fotos))
    .catch(error => {
      console.error('Error searching photos:', error);
      res.status(500).json({ error: 'Error al buscar las fotos' });
    });
});

// Ruta para busqueda y renderizado de vista
router.get('/search/view', function(req, res, next) {
  const term = req.query.term;
  if (!term) {
    // No term provided; redirect to all fotos view
    return res.redirect('/fotos/findAll/view');
  }
  // Si el termino es numerico intentar buscar por ID primero
  if (/^\d+$/.test(term)) {
    return fotoService.findById(parseInt(term, 10))
      .then(foto => {
        if (foto) {
          return res.render('fotos', {
            title: `Foto ID ${term}`,
            arrFotos: [foto],
            searchTerm: term
          });
        }
        // Si no se encuentra, continuar con la busqueda por texto
        return fotoService.searchByText(term)
          .then(fotos => res.render('fotos', {
            title: `Busqueda: "${term}"`,
            arrFotos: fotos,
            searchTerm: term
          }));
      })
      .catch(error => {
        console.error('Error searching photo by ID for view:', error);
        res.status(500).render('error', { message: 'Error al buscar la foto' });
      });
  }

  // Busqueda por texto por defecto
  fotoService.searchByText(term)
    .then(fotos => {
      res.render('fotos', {
        title: `Busqueda: "${term}"`,
        arrFotos: fotos,
        searchTerm: term
      });
    })
    .catch(error => {
      console.error('Error searching photos for view:', error);
      res.status(500).render('error', { message: 'Error al buscar las fotos' });
    });
});

module.exports = router; 