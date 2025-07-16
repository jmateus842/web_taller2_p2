---
trigger: manual
---

<S07Context version="7">

  <!-- ──────────────────────────── 1  DATA SOURCE ──────────────────────────── -->
  <DataSource>
    <Format>
      <Country>Ecuador</Country>
      <FileType>TXT</FileType>
      <Encoding>Latin1</Encoding>
      <Delimiter>Tab | Pipe (auto-detect)</Delimiter>
      <HeaderLine>File-level metadata (not column headers)</HeaderLine>
      <SchemaFile>${S07_STRUCTURE_PATH} ‑ default docs/s07/v7/structure.json</SchemaFile>
      <Compression>zip | gz (optional)</Compression>
    </Format>
    <Catalogues>
      <Path>docs/s07/v7/catalogues_json/</Path>
      <SeedScripts>
        sql/seed_s07_reference_tables_v1.sql
      </SeedScripts>
    </Catalogues>
  </DataSource>

  <!-- ───────────────────────── 2  REFERENCE TABLES ──────────────────────── -->
  <ReferenceTables>
    <Table>s07_ref_rangos_ingresos (income ranges with M1-M8, Y1-Y9 codes)</Table>
    <Table>s07_ref_niveles_riesgo (risk levels)</Table>
    <Table>s07_ref_niveles_patrimonio (wealth/equity levels)</Table>
    <Table>s07_ref_parentescos (family relationships)</Table>
    <Table>s07_ref_actividades_credito (economic activities)</Table>
    <Table>s07_ref_canales_emision (emission channels)</Table>
    <Table>s07_ref_formas_pago (payment methods)</Table>
    <Schema>Columns: codigo (PK), descripcion, created_at</Schema>
  </ReferenceTables>

  <!-- ───────────────────────── 3  PARSING OUTPUT ───────────────────────── -->
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
        <FieldType>row_status</FieldType>
      </Row>
    </Data>
  </ParsingOutput>

  <!-- ──────────────────────── 4  DATABASE SCHEMA ────────────────────────── -->
  <DatabaseSchema version="v7">
    <MainTables>
      <Header name="s07_header">
        <Field>id (PK)</Field>
        <Field>codigo_estructura</Field>
        <Field>codigo_entidad</Field>
        <Field>fecha_datos</Field>
        <Field>numero_total_registros</Field>
        <Field>file_path</Field>
        <Field>file_sha256</Field>
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
        <RawFields>All original fields preserved with _raw suffix</RawFields>
      </Detail>
    </MainTables>

    <Indexes>
      <Btree>s07_detalle(is_valid)</Btree>
      <Btree>s07_detalle(header_id)</Btree>
      <GIN>s07_detalle(validation_errors jsonb_path_ops)</GIN>
      <GIN>s07_detalle(extra_data jsonb_path_ops)</GIN>
    </Indexes>
  </DatabaseSchema>

  <!-- ──────────────────────── 5  VALIDATION RULES ──────────────────────── -->
  <ValidationRules>
    <ReferenceData>All codes validated against reference tables</ReferenceData>
    <Critical>Reject row on invalid reference data</Critical>
    <Warning>Flag warnings for data quality issues</Warning>
  </ValidationRules>

  <!-- ─────────────────────── 6  TESTING TOOLS ──────────────────────────── -->
  <TestingTools>
    <Script>scripts/test_upload_s07.py</Script>
    <Features>
      <Feature>Interactive file selection menu</Feature>
      <Feature>Command-line options for automation</Feature>
      <Feature>Flexible directory and file specification</Feature>
    </Features>
    <Usage>
      python test_upload_s07.py --dir path/to/files
      python test_upload_s07.py --file specific_file.txt
    </Usage>
  </TestingTools>

  <!-- ─────────────────────── 7  WORKFLOW ──────────────────────────────── -->
  <Workflow>
    <Step>1. Load reference tables using seed_s07_reference_tables_v1.sql</Step>
    <Step>2. Prepare S07 files in TXT format</Step>
    <Step>3. Run test_upload_s07.py to validate and load data</Step>
    <Step>4. Review validation results in database</Step>
  </Workflow>

  <!-- ───────────────────── 8  DATA INTEGRATION ────────────────────────── -->
  <DataIntegration>
    <ORM>SQLAlchemy</ORM>
    <Models>
      <Model>S07Header - Maps to s07_header table</Model>
      <Model>S07Detalle - Maps to s07_detalle table with reference to header</Model>
    </Models>
    <TransformationLogic>
      <Transformer>S07Transformer class with data type conversions</Transformer>
      <ReferenceValidation>Validates against reference tables</ReferenceValidation>
      <RawFields>Preserves raw values in *_raw columns</RawFields>
    </TransformationLogic>
  </DataIntegration>

<!-- ───────────────────── 9  RECOMMENDED NEXT STEPS ───────────────────── -->
  <NextSteps priority="high">
    <Item>
      <Title>Enhanced Validation Rules</Title>
      <Description>Implement more advanced validation rules that leverage the reference tables</Description>
      <Benefit>Improves data quality and consistency</Benefit>
    </Item>
    <Item>
      <Title>Reporting Interface</Title>
      <Description>Develop queries/views that join detail records with reference tables for human-readable reports</Description>
      <Benefit>Enables better data analysis and decision making</Benefit>
    </Item>
    <Item>
      <Title>Data Monitoring</Title>
      <Description>Set up regular checks to ensure data integrity and track validation success rates</Description>
      <Benefit>Proactive issue detection and quality assurance</Benefit>
    </Item>
    <Item>
      <Title>Documentation Update</Title>
      <Description>Update project documentation with the completed reference table implementation and usage guidelines</Description>
      <Benefit>Improves maintainability and onboarding</Benefit>
    </Item>
    <Item>
      <Title>Automated Testing</Title>
      <Description>Expand test coverage with automated test cases for all reference tables and validation rules</Description>
      <Benefit>Ensures reliability during future changes</Benefit>
    </Item>
    <Item>
      <Title>Performance Optimization</Title>
      <Description>Monitor and optimize query performance, especially for large datasets</Description>
      <Benefit>Better scalability and user experience</Benefit>
    </Item>
  </NextSteps>

</S07Context>