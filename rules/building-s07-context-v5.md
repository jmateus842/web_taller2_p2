---
trigger: manual
---

<S07Context version="5">

  <!-- ──────────────────────────── 1  DATA SOURCE ──────────────────────────── -->
  <DataSource>
    <Format>
      <Country>Ecuador</Country>
      <FileType>TXT</FileType>
      <Encoding>Latin1</Encoding>
      <Delimiter>Tab | Pipe (auto-detect)</Delimiter>
      <HeaderLine>File-level metadata (not column headers)</HeaderLine>
      <SchemaFile>${S07_STRUCTURE_PATH} ‑ default docs/s07/v5/structure.json</SchemaFile>
      <Compression>zip | gz (optional)</Compression>
    </Format>
    <Catalogues>
      <Path>docs/s07/v5/catalogues_json/</Path>
      <SeedScripts>
        src/s07_processor/seed_cantones.py
        src/s07_processor/seed_generic.py
      </SeedScripts>
    </Catalogues>
  </DataSource>

  <!-- ───────────────────────── 2  PARSING OUTPUT ───────────────────────── -->
  <ParsingOutput>
    <MetadataFields>
      <Field>codigo_estructura</Field>
      <Field>codigo_entidad</Field>
      <Field>fecha_datos</Field>
      <Field>numero_total_registros</Field>
      <Field>file_path</Field>
      <Field>file_sha256</Field>
    </MetadataFields>
    <Data>
      <Row>
        <FieldType>parsed</FieldType>
        <FieldType>raw</FieldType>
        <FieldType>errors</FieldType>
        <FieldType>row_status</FieldType><!-- valid | invalid | warning -->
      </Row>
    </Data>
    <Design>
      Returned as {"metadata": meta_dict, "data": list_of_rows}
    </Design>
  </ParsingOutput>

  <!-- ──────────────────────── 3  VALIDATION TIERS ───────────────────────── -->
  <ValidationTiers schema="docs/s07/v5/validation_rules.json">
    <Critical>Reject row / abort file</Critical>
    <WarningBlock>Abort file, keep header only</WarningBlock>
    <WarningRow>Load row but flag warning</WarningRow>
    <Informational>Accept as-is</Informational>
  </ValidationTiers>

  <!-- ──────────────────────── 4  DATABASE SCHEMA ────────────────────────── -->
  <DatabaseSchema version="v5">
    <MainTables>
      <Metadata name="s07_metadata" partition_key="anio_trimestre"/>
      <Data name="s07_data" partition_key="anio_trimestre"/>
    </MainTables>

    <ReferenceTables>
      Pattern: s07_ref_*
      Seeded from JSON catalogues (see DataSource/Catalogues)
      DEFERRABLE INITIALLY DEFERRED FKs from data to each ref table
    </ReferenceTables>

    <Indexes>
      <Btree>s07_data(is_valid)</Btree>
      <Btree>s07_data(numero_poliza)</Btree>
      <Btree>s07_data(factura)</Btree>
      <GIN>s07_data(validation_errors jsonb_path_ops)</GIN>
      <MaterializedView>s07_data_valid</MaterializedView>
    </Indexes>

    <Partitioning>Quarterly by fecha_emision (YYYY-Q)</Partitioning>
  </DatabaseSchema>

  <!-- ───────────────────────── 5  CONFIGURATION ─────────────────────────── -->
  <Configuration>
    <EnvFile>.env (ignored by Git)</EnvFile>
    <Variables>
      <Var>S07_DATABASE_URL</Var>
      <Var>S07_LOG_DIR</Var>
      <Var>S07_STRUCTURE_PATH</Var>
      <Var>S07_LOG_LEVEL</Var>
    </Variables>
    <Lib>python-dotenv autoloaded in scripts</Lib>
  </Configuration>

  <!-- ───────────────────────────── 6  ETL LOADER ────────────────────────── -->
  <ETLLoader>
    <Metadata>
      Insert, capture id
    </Metadata>
    <Data>
      COPY FROM STDIN via psycopg2
      Parallel load when > 500k rows
      Populate normalized FK columns where matches exist
    </Data>
    <ErrorStrategy>
      Dead-letter table s07_data_rejected
      Transactions + rollback on critical failure
    </ErrorStrategy>
    <AutomationReady>Yes (Airflow DAG)</AutomationReady>
  </ETLLoader>

  <!-- ──────────────────────── 7  PROJECT STRUCTURE ──────────────────────── -->
  <ProjectStructure>
    <Code>
      src/s07_processor/   (parsers)
      src/s07_etl/         (loaders, validators)
      src/ruc_processor/
    </Code>
    <Config>.env, config.toml (optional)</Config>
    <SchemaDocs>docs/s07/v5/, sql/</SchemaDocs>
    <Tests>tests/s07_processor/</Tests>
    <Stack>
      <Python>3.11</Python>
      <Libraries>pandas, psycopg2-binary, python-dotenv, joblib</Libraries>
      <Database>PostgreSQL 17 + PostGIS</Database>
    </Stack>
  </ProjectStructure>

  <!-- ──────────────────────── 8  IMPLEMENTATION STATUS ──────────────────── -->
  <ImplementationStatus>
    <Parser>Stable</Parser>
    <ReferenceTables>Created &amp; seeded</ReferenceTables>
    <EnvConfig>Enabled</EnvConfig>
    <Indexes>Applied</Indexes>
    <ETLLoader>Beta</ETLLoader>
  </ImplementationStatus>

  <!-- ────────────────────────── 9  ROADMAP ──────────────────────────────── -->
  <Roadmap>
    <Task>Real-time webhook ingestion</Task>
    <Task>Data-quality dashboards (Grafana)</Task>
    <Task>Finish generic seeder utility</Task>
    <Task>Publish Docker image for loader</Task>
    <Task>Add BI materialized views</Task>
  </Roadmap>

  <!-- ───────────────────── 10  DEVELOPER GUIDANCE ──────────────────────── -->
  <DeveloperGuidance>
    <Onboarding>README + dev-container.json</Onboarding>
    <Testing>pytest, docker-pg service, coverage</Testing>
    <CI>GitHub Actions (format, lint, type-check, test)</CI>
    <PreCommit>black, isort, flake8, mypy</PreCommit>
  </DeveloperGuidance>

  <!-- ──────────────────── 11  IMMEDIATE ACTIONS ────────────────────────── -->
  <ImmediateActions>
    <Action>Create src/s07_etl/ package skeleton</Action>
    <Action>Write migration script v4→v5</Action>
    <Action>Update CI matrix to PostgreSQL 17</Action>
    <Action>Configure Airflow DAG (dev)</Action>
  </ImmediateActions>

</S07Context>