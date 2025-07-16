Aquí tienes una **guía práctica paso a paso** basada en el contenido del documento “3 - backend 2.pdf”, que resume cómo desarrollar una aplicación backend en Node.js con Express, Sequelize y MySQL:

---

## 🧰 Requisitos previos

* Tener instalado **Node.js** y **npm**
* Tener instalado **MySQL Server** y **Workbench**
* Tener conocimientos básicos de JavaScript, Express y SQL

---

## 1. ⚙️ Inicializa tu proyecto

```bash
npm init -y
npm install express
npm install -D nodemon
```

---

## 2. 📦 Instala Sequelize y configura

```bash
npm install -g sequelize-cli
npm install --save sequelize mysql2
sequelize init
```

Esto crea:

* `config/config.json` – configuración de la DB
* Carpeta `models/` – modelos de entidades
* Carpeta `migrations/` – scripts de creación/modificación de tablas
* Carpeta `seeders/` – scripts para llenar la base con datos de prueba

---

## 3. 🧩 Configura tu base de datos

1. Crea una base de datos en **MySQL Workbench**
2. Ajusta `config/config.json` con los datos de conexión (usuario, contraseña, nombre de la base, host)

---

## 4. 🧱 Crea tu primer modelo

```bash
sequelize model:create --name foto --attributes titulo:string,descripcion:string,calificacion:float,ruta:string
```

Esto genera:

* `models/foto.js` con el modelo
* Script de migración en `migrations/`

---

## 5. 🛠️ Aplica las migraciones

```bash
sequelize db:migrate
```

Para revertir:

```bash
sequelize db:migrate:undo
```

O todas:

```bash
sequelize db:migrate:undo:all
```

---

## 6. 🌱 Crea datos de prueba (Seeders)

```bash
sequelize seed:generate --name fotos
```

Dentro del archivo generado en `seeders/`, en la función `up`, agrega:

```js
async up (queryInterface, Sequelize) {
  for (let i = 0; i < 10; i++) {
    await queryInterface.bulkInsert('fotos', [{
      titulo: 'foto' + i,
      descripcion: 'Lorem ipsum...',
      calificacion: (Math.random() * 10).toFixed(2),
      ruta: 'public/images/foto' + i + '.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  }
}
```

Y en `down`:

```js
async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('fotos', null, {});
}
```

Ejecuta:

```bash
sequelize db:seed:all
```

Para deshacer:

```bash
sequelize db:seed:undo:all
```

---

## 7. 🔄 Rutas y Controladores

### `routes/fotos.js`

```js
var express = require('express');
var router = express.Router();
const Foto = require('../models').foto;

router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({ attributes: { exclude: ["updatedAt"] } })
    .then(fotos => res.json(fotos))
    .catch(error => res.status(400).send(error));
});

router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({ attributes: { exclude: ["updatedAt"] } })
    .then(fotos => res.render('fotos', { title: 'Fotos', arrFotos: fotos }))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
```

---

## 8. 🧠 Vista (`views/fotos.ejs`)

```ejs
<div class="container-fluid p-4">
  <h1 class="pb-4"><%= title %></h1>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Id</th>
        <th>Título</th>
        <th>Descripción</th>
        <th>Ruta</th>
        <th>Fecha de creación</th>
      </tr>
    </thead>
    <tbody>
      <% arrFotos.forEach((foto) => { %>
        <tr>
          <td><%= foto.id %></td>
          <td><%= foto.titulo %></td>
          <td><%= foto.descripcion %></td>
          <td><%= foto.ruta %></td>
          <td><%= foto.createdAt.toLocaleDateString('en-US') %></td>
        </tr>
      <% }); %>
    </tbody>
  </table>
</div>
```

---

## 9. 🧩 Enlaza las rutas en `app.js`

```js
var fotosRouter = require('./routes/fotos');
app.use('/fotos', fotosRouter);
```

---

## ✅ Resultado final

Puedes acceder a:

* `/fotos/findAll/json` para ver los datos en JSON
* `/fotos/findAll/view` para verlos en formato HTML con tabla

---
