---
trigger: manual
---

<GuiContext version="3">

  <!-- ───────────────────────── 1  PURPOSE & SCOPE ───────────────────────── -->
  <Purpose>
    <Goal>Production-ready desktop application for S07 / RUC data import, validation, and export with persistent data storage.</Goal>
    <Audience>End users, data analysts, insurance professionals.</Audience>
    <Stack>Python 3.11 · customtkinter · SQLAlchemy · PyInstaller.</Stack>
    <Status>Core functionality complete, packaging working, data persistence fixed.</Status>
  </Purpose>

  <!-- ──────────────────────── 2  MAIN SCREENS / WIDGETS ─────────────────── -->
  <Screens>
    <MainWindow file="src/gui/main_window.py">
      <Widget>FileSelectorButton (dynamic label based on file type)</Widget>
      <Widget>ImportButton (S07/RUC radio buttons)</Widget>
      <Widget>ExportCsvButton (enabled when data exists)</Widget>
      <Widget>ExportExcelButton (enabled when data exists)</Widget>
      <Widget>LogTextBox (comprehensive logging)</Widget>
      <Widget>TabView (Import/Export)</Widget>
      <Widget>TableSelector (s07_header, s07_detalle, ruc_data)</Widget>
      <Widget>FilterOptions (Start row, Rows to export)</Widget>
      <Completed>Database status messages</Completed>
      <Completed>Data-aware export enablement</Completed>
      <Planned>ProgressBar (indeterminate)</Planned>
      <Planned>Error dialogs (CTkMessageBox)</Planned>
    </MainWindow>
  </Screens>

  <!-- ─────────────────────────── 3  TABS ──────────────────────────── -->
  <Tabs>
    <ImportTab>
      <Purpose>Handle file selection and data import with type-specific processing</Purpose>
      <Widget>S07/RUC radio buttons</Widget>
      <Widget>FileSelectorButton (dynamic filter)</Widget>
      <Widget>ImportButton</Widget>
      <Flow>Select file type → Select file → Import to database → Show row counts</Flow>
      <Completed>Post-import row count display</Completed>
      <Completed>File type-specific processing</Completed>
    </ImportTab>
    
    <ExportTab>
      <Purpose>Export data with comprehensive filtering and format options</Purpose>
      <Widget>TableSelector (dropdown: s07_header, s07_detalle, ruc_data)</Widget>
      <Widget>FilterOptions (Start row, Rows to export)</Widget>
      <Widget>ExportCsvButton (with default filenames)</Widget>
      <Widget>ExportExcelButton (with default filenames)</Widget>
      <Widget>Empty tables message (when no data)</Widget>
      <Flow>Select table → Configure filters → Export to CSV/Excel</Flow>
      <Completed>Positional slicing support</Completed>
      <Completed>Default filename generation</Completed>
      <Issue>Empty tables message doesn't disappear after import</Issue>
    </ExportTab>
  </Tabs>

  <!-- ─────────────────────────── 4  EVENT FLOW ──────────────────────────── -->
  <EventFlow>
    <Step>User selects S07 or RUC file type via radio buttons</Step>
    <Step>FileSelector adapts filter and button label</Step>
    <Step>User picks file via FileSelector</Step>
    <Step>ImportButton → ingestion_hooks.ingest_s07() or ingest_ruc() executes</Step>
    <Step>On success → LogTextBox shows row counts and database status</Step>
    <Step>Export buttons automatically enable if data exists</Step>
    <Step>User switches to Export tab</Step>
    <Step>User selects table and filtering options</Step>
    <Step>Export buttons → export_utils.export_*() execute with filters</Step>
    <Issue>Empty tables message should refresh after successful import</Issue>
  </EventFlow>

  <!-- ───────────────────────── 5  DATA INTERACTION ──────────────────────── -->
  <DataInteraction>
    <Engine>SQLAlchemy engine from settings.get_db_url()</Engine>
    <Database>
      <Development>SQLite (instance/database.db)</Development>
      <Production>PostgreSQL (configurable via DB_URL)</Production>
      <Persistence>Fixed - database now persists between runs in packaged app</Persistence>
    </Database>
    <Tables>s07_header · s07_detalle · ruc_data</Tables>
    <Import>
      <S07>Fixed-width text file parsing with validation</S07>
      <RUC>CSV parsing with header normalization and schema filtering</RUC>
      <Completed>Duplicate handling for RUC data</Completed>
    </Import>
    <Export>
      <Options>
        <PositionalSlicing>Start row / Rows to export</PositionalSlicing>
        <HeaderFiltering>Latest import only (planned)</HeaderFiltering>
      </Options>
      <Formats>pandas → CSV / Excel (xlsxwriter with openpyxl fallback)</Formats>
      <Completed>SQL query optimization and proper clause ordering</Completed>
    </Export>
  </DataInteraction>

  <!-- ──────────────────────── 6  ERROR HANDLING ─────────────────────────── -->
  <ErrorHandling>
    <Completed>Application-wide logging (console + s07_processor_gui.log)</Completed>
    <Completed>Uncaught exception logging and user notification</Completed>
    <Completed>Database initialization error handling</Completed>
    <Completed>Missing dependency graceful fallbacks (xlsxwriter → openpyxl)</Completed>
    <Planned>CTkMessageBox for fatal errors</Planned>
    <Planned>Progress indicators for long operations</Planned>
  </ErrorHandling>

  <!-- ───────────────────────── 7  PACKAGING & DEPLOYMENT ─────────────────────────── -->
  <Packaging>
    <Tool>PyInstaller with custom build.spec</Tool>
    <Completed>All data files included (JSON, CSV, TXT, SQL)</Completed>
    <Completed>Dependency analysis and inclusion</Completed>
    <Completed>Database persistence in packaged app</Completed>
    <Completed>Cross-platform deployment testing</Completed>
    <Status>Production-ready packaging with data persistence</Status>
  </Packaging>

  <!-- ───────────────────────── 8  TESTING & VALIDATION ─────────────────────────── -->
  <Testing>
    <Completed>Integration test suite (test_roundtrip.py)</Completed>
    <Completed>End-to-end import/export validation</Completed>
    <Completed>Database persistence verification</Completed>
    <Completed>Cross-database compatibility (SQLite/PostgreSQL)</Completed>
    <Planned>GUI interaction tests (pytest-qt)</Planned>
    <Planned>Error scenario testing</Planned>
  </Testing>

  <!-- ───────────────────────── 9  DEMO WORKFLOW ─────────────────────────── -->
  <Workflow>
    <Step>1. Launch GUI: python -m src.gui or packaged .exe</Step>
    <Step>2. Select S07 file type and choose sample_data/s07_medium_test1.txt</Step>
    <Step>3. Click Import → observe row counts and database status</Step>
    <Step>4. Switch to Export tab (buttons should be enabled)</Step>
    <Step>5. Select table and configure filters</Step>
    <Step>6. Click Export CSV/Excel → choose save path</Step>
    <Step>7. Verify exported data matches filters</Step>
    <Step>8. Restart app → verify data persistence</Step>
  </Workflow>

  <!-- ─────────────────────── 10  CURRENT ISSUES & PRIORITIES ─────────────────────────────── -->
  <CurrentIssues>
    <Critical>
      <Issue>Empty tables message in export tab doesn't disappear after successful import</Issue>
      <Impact>Confusing UX - users see "no data" message even when data exists</Impact>
      <Status>Next priority to fix</Status>
    </Critical>
  </CurrentIssues>

  <NextSteps priority="high">
    <Item>
      <Title>Fix empty tables message refresh</Title>
      <Benefit>Clear UX feedback after successful imports</Benefit>
      <Effort>Low - update export tab state management</Effort>
    </Item>
    <Item>
      <Title>Progress indicators for long operations</Title>
      <Benefit>Better user feedback during imports/exports</Benefit>
      <Effort>Medium - add progress bars and status updates</Effort>
    </Item>
    <Item>
      <Title>Error dialogs with CTkMessageBox</Title>
      <Benefit>Clearer error communication</Benefit>
      <Effort>Medium - implement error dialog system</Effort>
    </Item>
    <Item>
      <Title>Persistent DB-URL settings</Title>
      <Benefit>User-configurable database connections</Benefit>
      <Effort>Medium - add settings persistence</Effort>
    </Item>
  </NextSteps>

  <!-- ─────────────────────── 11  TECHNICAL DEBT & CLEANUP ─────────────────────────────── -->
  <TechnicalDebt>
    <Item>Legacy test files need cleanup (marked with pytest.skip or deletion)</Item>
    <Item>Consider database migration system for schema updates</Item>
    <Item>Expand integration tests for edge cases</Item>
    <Item>Document deployment procedures for end users</Item>
  </TechnicalDebt>

</GuiContext> 