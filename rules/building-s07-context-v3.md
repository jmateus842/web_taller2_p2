---
trigger: manual
---

<S07Context version="3">
  <DataSource>
    <Format>
      <Country>Ecuador</Country>
      <FileType>TXT</FileType>
      <Encoding>Latin1</Encoding>
      <Delimiter>Tab</Delimiter>
      <HeaderLine>File-level metadata (not column headers)</HeaderLine>
      <SchemaFile>docs/s07_inital_analysis/flexible_s07_structure.json</SchemaFile>
    </Format>
  </DataSource>
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
    <Design>Output is a dict with "header" and "detalle" keys for normalized DB insertion.</Design>
  </ParsingOutput>
  <ValidationTiers>
    <Critical>Reject row if invalid</Critical>
    <Important>Warn and flag, but keep row</Important>
    <Informational>Accept as-is</Informational>
  </ValidationTiers>
  <DatabaseSchema version="v3">
    <HeaderTable name="s07_header">
      <Description>One row per file, stores all header fields and import metadata</Description>
      <Features>
        <FlexibleTypes>Yes</FlexibleTypes>
        <Extensibility>extra_data (JSONB)</Extensibility>
      </Features>
    </HeaderTable>
    <DetalleTable name="s07_detalle">
      <Description>One row per data line, with header_id foreign key to s07_header</Description>
      <Features>
        <AllFields>From flexible schema</AllFields>
        <RawColumns>For reference fields</RawColumns>
        <Extensibility>extra_data (JSONB), validation_errors (JSONB), is_valid (BOOLEAN)</Extensibility>
      </Features>
    </DetalleTable>
    <SchemaFile>sql/create_s07_main_table_v1.sql</SchemaFile>
  </DatabaseSchema>
  <ETLLoader>
    <Description>
      Python script inserts header into s07_header, retrieves id, inserts each detalle row with header_id.
    </Description>
    <Features>
      <ReferentialIntegrity>Ensured between tables</ReferentialIntegrity>
      <AutomationReady>Yes</AutomationReady>
    </Features>
  </ETLLoader>
  <ProjectStructure>
    <Code>src/s07_processor/, src/ruc_processor/</Code>
    <SchemaDocs>docs/s07_inital_analysis/, sql/</SchemaDocs>
    <Tests>tests/s07_processor/</Tests>
    <Stack>
      <Python>3.11</Python>
      <Libraries>pandas, unittest, psycopg2</Libraries>
      <Database>PostgreSQL 17</Database>
    </Stack>
  </ProjectStructure>
  <ImplementationStatus>
    <Parser>Normalized and robust</Parser>
    <ETLLoader>Operational</ETLLoader>
    <ValidationTiers>Implemented</ValidationTiers>
    <ErrorTracking>In place</ErrorTracking>
    <TerminalOutput>Improved</TerminalOutput>
    <SchemaAlignment>With RUC table best practices</SchemaAlignment>
  </ImplementationStatus>
  <Roadmap>
    <Indexes>Add indexes for is_valid, numero_poliza, factura, validation_errors (GIN)</Indexes>
    <Triggers>Optional: audit/change tracking</Triggers>
    <ReferenceTableIntegration>Implement lookups and normalization for reference fields</ReferenceTableIntegration>
    <AdvancedValidation>Cross-field checks, improved reporting</AdvancedValidation>
    <ExportAudit>Export invalid rows, track imports</ExportAudit>
    <Automation>Batch processing, logging, error notification</Automation>
    <Documentation>Keep README and this context file up to date</Documentation>
  </Roadmap>
  <DeveloperGuidance>
    <PracticalHelp>Provide step-by-step help</PracticalHelp>
    <DesignExplanation>Explain decisions and best practices</DesignExplanation>
    <HandsOn>Supply code, SQL, data flow examples</HandsOn>
    <Encouragement>Encourage confidence and learning</Encouragement>
  </DeveloperGuidance>
  <ImmediateActions>
    <Action>Finalize and apply normalized schema</Action>
    <Action>Write and test ETL loader script</Action>
    <Action>Add indexes and triggers as needed</Action>
    <Action>Integrate reference tables and advanced validation</Action>
  </ImmediateActions>
</S07Context>