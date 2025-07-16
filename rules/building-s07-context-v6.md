---
trigger: manual
---

<S07Context version="6">

  <!-- ──────────────────────────── 1  DATA SOURCE ──────────────────────────── -->
  <DataSource>
    <Format>
      <Country>Ecuador</Country>
      <FileType>TXT</FileType>
      <Encoding>Latin1</Encoding>
      <Delimiter>Tab | Pipe (auto-detect)</Delimiter>
      <HeaderLine>File-level metadata (not column headers)</HeaderLine>
      <SchemaFile>${S07_STRUCTURE_PATH} ‑ default docs/s07/v6/structure.json</SchemaFile>
      <Compression>zip | gz (optional)</Compression>
    </Format>
    <Catalogues>
      <Path>docs/s07/v6/catalogues_json/</Path>
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
  <ValidationTiers schema="docs/s07/v6/validation_rules.json">
    <Critical>Reject row / abort file</Critical>
    <WarningBlock>Abort file, keep header only</WarningBlock>
    <WarningRow>Load row but flag warning</WarningRow>
    <Informational>Accept as-is</Informational>
  </ValidationTiers>

  <!-- ──────────────────────── 4  DATABASE SCHEMA ────────────────────────── -->
  <DatabaseSchema version="v6">
    <MainTables>
      <Header name="s07_header">
        <Field>id (PK)</Field>
        <Field>codigo_estructura</Field>
        <Field>codigo_entidad</Field>
        <Field>fecha_datos</Field>
        <Field>numero_total_registros</Field>
        <Field>file_path</Field>
        <Field>extra_data (JSONB)</Field>
        <Field>created_at</Field>
      </Header>
      <Detail name="s07_detalle">
        <Field>id (PK)</Field>
        <Field>header_id (FK to s07_header)</Field>
        <Field>is_valid</Field>
        <Field>validation_errors (JSONB)</Field>
        <Field>extra_data (JSONB)</Field>
        <Field>created_at</Field>
        <Field>normalized fields (see SQL create script)</Field>
        <Field>raw fields (*_raw column per normalized field)</Field>
      </Detail>
    </MainTables>

    <PreexistingTables>
      <SQLScripts>
        <Script>docs/file_buffer/s07_header_create_script.sql</Script>
        <Script>docs/file_buffer/s07_detalle_create_script.sql</Script>
      </SQLScripts>
      <Approach>Existing tables used; no creation in code</Approach>
    </PreexistingTables>

    <Indexes>
      <Btree>s07_detalle(is_valid)</Btree>
      <Btree>s07_detalle(header_id)</Btree>
      <GIN>s07_detalle(validation_errors jsonb_path_ops)</GIN>
      <GIN>s07_detalle(extra_data jsonb_path_ops)</GIN>
    </Indexes>
  </DatabaseSchema>

  <!-- ───────────────────────── 5  CONFIGURATION ─────────────────────────── -->
  <Configuration>
    <EnvFile>.env (ignored by Git)</EnvFile>
    <Variables>
      <Var>DATABASE_URL (primary)</Var>
      <Var>S07_DATABASE_URL (specialized, falls back to DATABASE_URL)</Var>
      <Var>S07_LOG_DIR</Var>
      <Var>S07_STRUCTURE_PATH</Var>
      <Var>S07_LOG_LEVEL</Var>
    </Variables>
    <Lib>python-dotenv autoloaded in scripts</Lib>
  </Configuration>

  <!-- ───────────────────────────── 6  DATA INTEGRATION ────────────────────────── -->
  <DataIntegration>
    <ORM>SQLAlchemy</ORM>
    <Models>
      <Model>S07Header - Maps to s07_header table</Model>
      <Model>S07Detalle - Maps to s07_detalle table with 60+ columns</Model>
    </Models>
    <TransformationLogic>
      <Transformer>S07Transformer class with data type conversions</Transformer>
      <DateFormat>Handles multiple date formats (dd/mm/yyyy, yyyy-mm-dd)</DateFormat>
      <RawFields>Preserves raw values in *_raw columns</RawFields>
      <ValidationFlags>Sets is_valid flag and stores validation_errors</ValidationFlags>
      <ExtraData>Stores non-standard fields in JSONB extra_data</ExtraData>
    </TransformationLogic>
    <Pipeline>
      <Step>Parse with S07Parser</Step>
      <Step>Transform with S07Transformer</Step>
      <Step>Load via SQLAlchemy ORM with transactions</Step>
    </Pipeline>
    <ErrorStrategy>
      <Strategy>Transaction rollback on failure</Strategy>
      <Logging>Detailed event logging</Logging>
      <ValidationTracking>Validation errors stored with records</ValidationTracking>
    </ErrorStrategy>
  </DataIntegration>

  <!-- ──────────────────────── 7  PROJECT STRUCTURE ──────────────────────── -->
  <ProjectStructure>
    <Code>
      <Package>src/s07_data/ (new structure)</Package>
      <Module>parser.py - Flexible parsing with field definitions</Module>
      <Module>transformer.py - Data transformation with validation</Module>
      <Module>models.py - SQLAlchemy ORM models</Module>
      <Module>integration.py - Database loading logic</Module>
    </Code>
    <Scripts>
      <Script>scripts/setup_s07_db.py - Verify table existence</Script>
      <Script>scripts/process_s07_files.py - CLI for processing</Script>
    </Scripts>
    <Config>.env, structure.json</Config>
    <SchemaDocs>docs/file_buffer/ (SQL scripts)</SchemaDocs>
    <Stack>
      <Python>3.11</Python>
      <Libraries>SQLAlchemy, psycopg2-binary, python-dotenv, argparse, logging</Libraries>
      <Database>PostgreSQL 17 + PostGIS</Database>
    </Stack>
  </ProjectStructure>

  <!-- ──────────────────────── 8  IMPLEMENTATION STATUS ──────────────────── -->
  <ImplementationStatus>
    <Parser>Implemented and stable</Parser>
    <Transformer>Implemented with data validation</Transformer>
    <Models>SQLAlchemy ORM aligned with existing tables</Models>
    <Integration>Function to process files/directories</Integration>
    <CLI>Tools for DB verification and processing</CLI>
    <EnvConfig>Enabled with fallback mechanism</EnvConfig>
  </ImplementationStatus>

  <!-- ────────────────────────── 9  ROADMAP ──────────────────────────────── -->
  <Roadmap>
    <Task>End-to-end testing with sample files</Task>
    <Task>Implement RUC validation integration</Task>
    <Task>Develop query and reporting tools</Task>
    <Task>Performance optimization for large files</Task>
    <Task>Add partitioning to improve query performance</Task>
    <Task>Integration with Airflow DAGs for scheduling</Task>
  </Roadmap>

  <!-- ───────────────────── 10  DEVELOPER GUIDANCE ──────────────────────── -->
  <DeveloperGuidance>
    <Onboarding>README + venv setup instructions</Onboarding>
    <Usage>
      1. Verify database with setup_s07_db.py
      2. Process files with process_s07_files.py
      3. Check stats with process_s07_files.py stats
    </Usage>
    <Testing>Sample files in tests/fixtures/</Testing>
    <DatabaseSetup>Relies on preexisting tables from SQL scripts</DatabaseSetup>
  </DeveloperGuidance>

  <!-- ──────────────────── 11  IMMEDIATE ACTIONS ────────────────────────── -->
  <ImmediateActions>
    <Action>Test end-to-end pipeline with sample files</Action>
    <Action>Verify all database fields are properly mapped</Action>
    <Action>Implement better error handling and reporting</Action>
    <Action>Create documentation for CLI tools</Action>
    <Action>Develop monitoring for data quality</Action>
  </ImmediateActions>

</S07Context>