Aquí tienes una **guía práctica paso a paso** basada en el documento *“3 - backend 3.pdf”*, centrado en implementar una **relación N\:M entre `foto` y `etiqueta`** usando Sequelize en Node.js.

---

## 🧩 Relación N\:M (foto —< fotoetiqueta >— etiqueta)

---

### 1. 📦 Crea los modelos

```bash
sequelize model:create --name etiqueta --attributes texto:string
sequelize model:create --name fotoetiqueta --attributes foto_id:integer,etiqueta_id:integer
```

---

### 2. 🧾 Modifica los modelos `fotoetiqueta.js` y `etiqueta.js`

Agrega en ambos modelos:

```js
modelName: 'etiqueta',
tableName: 'etiquetas'
```

Y:

```js
modelName: 'fotoetiqueta',
tableName: 'fotoetiquetas'
```

---

### 3. 🛠️ Ajusta la migración `create-fotoetiqueta`

Modifica el nombre de tabla:

```js
await queryInterface.createTable('fotoetiquetas', ...
await queryInterface.dropTable('fotoetiquetas', ...
```

---

### 4. 🔗 Agrega las restricciones (constraints)

Genera nueva migración:

```bash
sequelize migration:generate --name associate-foto-etiqueta
```

Edita el archivo generado, en `up`:

```js
await queryInterface.addConstraint('fotoetiquetas', {
  fields: ['foto_id'],
  name: 'foto_id_fk',
  type: 'foreign key',
  references: {
    table: 'fotos',
    field: 'id'
  },
  onDelete: 'cascade',
  onUpdate: 'set null'
});

await queryInterface.addConstraint('fotoetiquetas', {
  fields: ['etiqueta_id'],
  name: 'etiqueta_id_fk',
  type: 'foreign key',
  references: {
    table: 'etiquetas',
    field: 'id'
  },
  onDelete: 'cascade',
  onUpdate: 'set null'
});
```

Y en `down`:

```js
await queryInterface.removeConstraint('fotoetiquetas', 'foto_id_fk');
await queryInterface.removeConstraint('fotoetiquetas', 'etiqueta_id_fk');
```

---

### 5. 🧬 Ejecuta las migraciones

```bash
sequelize db:migrate
```

---

### 6. 🌱 Seeders: Etiquetas

```bash
sequelize seed:create --name etiquetas
```

En `up`:

```js
let etiquetas = ['foto', 'payaso', 'rojo', 'azul', 'techo', 'cielo', 'foco', 'luz'];
for (let etiqueta of etiquetas) {
  await queryInterface.bulkInsert('etiquetas', [{
    texto: etiqueta,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
}
```

En `down`:

```js
await queryInterface.bulkDelete('etiquetas', null, {});
```

---

### 7. 🌱 Seeders: fotoetiqueta

```bash
sequelize seed:create --name fotoetiqueta
```

En `up`:

```js
let [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos');
let [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

await queryInterface.bulkInsert('fotoetiquetas', [
  { foto_id: fotos[0].id, etiqueta_id: etiquetas[0].id, createdAt: new Date(), updatedAt: new Date() },
  { foto_id: fotos[0].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() },
  { foto_id: fotos[1].id, etiqueta_id: etiquetas[1].id, createdAt: new Date(), updatedAt: new Date() }
], {});
```

En `down`:

```js
await queryInterface.bulkDelete('fotoetiquetas', null, {});
```

---

### 8. 🔁 Asociaciones en los modelos

#### En `models/foto.js`:

```js
static associate(models) {
  models.foto.belongsToMany(models.etiqueta, {
    through: 'fotoetiquetas',
    foreignKey: 'foto_id'
  });
}
```

#### En `models/etiqueta.js`:

```js
static associate(models) {
  models.etiqueta.belongsToMany(models.foto, {
    through: 'fotoetiquetas',
    foreignKey: 'etiqueta_id'
  });
}
```

---

### 9. 🧭 Manejador de rutas `routes/fotos.js`

Agrega importación:

```js
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;
```

Y modifica el endpoint `/findAll/json`:

```js
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }]
  })
  .then(fotos => res.json(fotos))
  .catch(error => res.status(400).send(error));
});
```

---

### ✅ Ejecuta tu servidor

```bash
npm run devstart
```

Accede a:
📍 [http://localhost:3000/fotos/findAll/json](http://localhost:3000/fotos/findAll/json)

---


