---
trigger: manual
---

<S07Context version="4">

  <!-- ──────────────────────────── 1  DATA SOURCE ──────────────────────────── -->
  <DataSource>
    <Format>
      <Country>Ecuador</Country>
      <FileType>TXT</FileType>
      <Encoding>Latin1</Encoding>
      <Delimiter>Tab</Delimiter>
      <HeaderLine>File-level metadata (not column headers)</HeaderLine>
      <SchemaFile>docs/s07_inital_analysis/flexible_s07_structure.json</SchemaFile>
    </Format>
    <Catalogues>
      <Path>docs/s07_inital_analysis/tablas_ref_json/</Path>
      <SeedScripts>
        src/s07_processor/seed_cantones.py
        … (future: generic seed_x.py)
      </SeedScripts>
    </Catalogues>
  </DataSource>

  <!-- ───────────────────────── 2  PARSING OUTPUT ───────────────────────── -->
  <ParsingOutput>
    <HeaderFields>
      <Field>codigo_estructura</Field>
      <Field>codigo_entidad</Field>
      <Field>fecha_datos</Field>
      <Field>numero_total_registros</Field>
      <Field>file_path</Field>
    </HeaderFields>
    <Detalle>
      <Row>
        <FieldType>parsed</FieldType>
        <FieldType>raw</FieldType>
        <FieldType>errors</FieldType>
      </Row>
    </Detalle>
    <Design>
      Returned as {"header": header_dict, "detalle": list_of_rows}
    </Design>
  </ParsingOutput>

  <!-- ──────────────────────── 3  VALIDATION TIERS ───────────────────────── -->
  <ValidationTiers>
    <Critical>Reject row / abort file</Critical>
    <Important>Load row but flag warning</Important>
    <Informational>Accept as-is</Informational>
  </ValidationTiers>

  <!-- ──────────────────────── 4  DATABASE SCHEMA ────────────────────────── -->
  <DatabaseSchema version="v4">
    <MainTables>
      <Header name="s07_header"/>
      <Detalle name="s07_detalle"/>
    </MainTables>

    <ReferenceTables>
      Pattern: s07_ref_*
      Seeded from JSON catalogues (see DataSource/Catalogues)
      DEFERRABLE INITIALLY DEFERRED FKs from detalle to each ref table
    </ReferenceTables>

    <Indexes>
      <Btree>s07_detalle(is_valid)</Btree>
      <Btree>s07_detalle(numero_poliza)</Btree>
      <Btree>s07_detalle(factura)</Btree>
      <GIN>s07_detalle(validation_errors jsonb_path_ops)</GIN>
      <GIN>(optional) s07_detalle(extra_data)</GIN>
    </Indexes>

    <Partitioning>Future: by fecha_emision (year or quarter)</Partitioning>
  </DatabaseSchema>

  <!-- ───────────────────────── 5  CONFIGURATION ─────────────────────────── -->
  <Configuration>
    <EnvFile>.env  (ignored by Git)</EnvFile>
    <Variable>DATABASE_URL</Variable>
    <Lib>python-dotenv autoloaded in scripts</Lib>
  </Configuration>

  <!-- ───────────────────────────── 6  ETL LOADER ────────────────────────── -->
  <ETLLoader>
    <Header>
      Insert, capture id
    </Header>
    <Detalle>
      Bulk COPY/execute_batch with header_id FK
      Populate normalized FK columns where matches exist
    </Detalle>
    <ErrorStrategy>
      Transactions + rollback on critical failure
      validation_errors JSONB per row
    </ErrorStrategy>
    <AutomationReady>Yes</AutomationReady>
  </ETLLoader>

  <!-- ──────────────────────── 7  PROJECT STRUCTURE ──────────────────────── -->
  <ProjectStructure>
    <Code>
      src/s07_processor/  (parsers, loaders, seeders)
      src/ruc_processor/
    </Code>
    <Config>.env, config.toml (optional)</Config>
    <SchemaDocs>docs/s07_inital_analysis/, sql/</SchemaDocs>
    <Tests>tests/s07_processor/</Tests>
    <Stack>
      <Python>3.11</Python>
      <Libraries>pandas, psycopg2, python-dotenv</Libraries>
      <Database>PostgreSQL 17</Database>
    </Stack>
  </ProjectStructure>

  <!-- ──────────────────────── 8  IMPLEMENTATION STATUS ──────────────────── -->
  <ImplementationStatus>
    <Parser>Robust</Parser>
    <ReferenceTables>Created & seeded</ReferenceTables>
    <EnvConfig>Enabled</EnvConfig>
    <Indexes>Applied</Indexes>
    <ETLLoader>Operational</ETLLoader>
  </ImplementationStatus>

  <!-- ────────────────────────── 9  ROADMAP ──────────────────────────────── -->
  <Roadmap>
    <Task>Finish seed scripts for all remaining catalogues</Task>
    <Task>Add cross-field validation + reporting</Task>
    <Task>Partition detalle table when volumes justify</Task>
    <Task>Export invalid rows for business review</Task>
    <Task>Nightly batch job & e-mail summary</Task>
  </Roadmap>

  <!-- ───────────────────── 10  DEVELOPER GUIDANCE ──────────────────────── -->
  <DeveloperGuidance>
    <Onboarding>Use README + .env setup</Onboarding>
    <Testing>pytest with docker-pg service</Testing>
    <CI>GitHub Actions (lint + test)</CI>
  </DeveloperGuidance>

  <!-- ──────────────────── 11  IMMEDIATE ACTIONS ────────────────────────── -->
  <ImmediateActions>
    <Action>Generate missing seed_x scripts</Action>
    <Action>Add deferred FKs to detalle</Action>
    <Action>Wire ETL to use env-based DSN</Action>
    <Action>Document loader command examples</Action>
  </ImmediateActions>

</S07Context>