---
trigger: manual
---

<GuiContext version="4">

  <!-- ───────────────────────── 1  PURPOSE & SCOPE ───────────────────────── -->
  <Purpose>
    <Goal>Production-ready desktop application for S07 / RUC data import, validation, search, and export with persistent data storage and advanced user experience.</Goal>
    <Audience>End users, data analysts, insurance professionals requiring sophisticated data exploration capabilities.</Audience>
    <Stack>Python 3.11 · customtkinter · SQLAlchemy · PyInstaller · ttk.Treeview.</Stack>
    <Status>Core functionality complete, search capabilities implemented, advanced UI features added, packaging working, data persistence fixed.</Status>
  </Purpose>

  <!-- ──────────────────────── 2  MAIN SCREENS / WIDGETS ─────────────────── -->
  <Screens>
    <MainWindow file="src/gui/main_window.py">
      <Widget>FileSelectorButton (dynamic label based on file type)</Widget>
      <Widget>ImportButton (S07/RUC radio buttons)</Widget>
      <Widget>ExportCsvButton (enabled when data exists)</Widget>
      <Widget>ExportExcelButton (enabled when data exists)</Widget>
      <Widget>LogTextBox (comprehensive logging)</Widget>
      <Widget>TabView (Import/Export/Search)</Widget>
      <Widget>TableSelector (s07_header, s07_detalle, ruc_data)</Widget>
      <Widget>FilterOptions (Start row, Rows to export)</Widget>
      <Widget>PanedWindow (resizable main content and log area)</Widget>
      <Widget>CTkProgressBar (real-time progress for long operations)</Widget>
      <Completed>Database status messages</Completed>
      <Completed>Data-aware export enablement</Completed>
      <Completed>Progress bars for long operations</Completed>
      <Completed>Resizable UI layout with PanedWindow</Completed>
      <Planned>Error dialogs (CTkMessageBox)</Planned>
      <Planned>Persistent user preferences</Planned>
    </MainWindow>
  </Screens>

  <!-- ─────────────────────────── 3  TABS ──────────────────────────── -->
  <Tabs>
    <ImportTab>
      <Purpose>Handle file selection and data import with type-specific processing and progress feedback</Purpose>
      <Widget>S07/RUC radio buttons</Widget>
      <Widget>FileSelectorButton (dynamic filter)</Widget>
      <Widget>ImportButton</Widget>
      <Widget>CTkProgressBar (shows import progress)</Widget>
      <Widget>CTkLabel (status messages during import)</Widget>
      <Flow>Select file type → Select file → Import to database with progress → Show row counts</Flow>
      <Completed>Post-import row count display</Completed>
      <Completed>File type-specific processing</Completed>
      <Completed>Progress bars with detailed status messages</Completed>
      <Completed>Button state management during operations</Completed>
    </ImportTab>
    
    <ExportTab>
      <Purpose>Export data with comprehensive filtering, format options, and progress feedback</Purpose>
      <Widget>TableSelector (dropdown: s07_header, s07_detalle, ruc_data)</Widget>
      <Widget>FilterOptions (Start row, Rows to export)</Widget>
      <Widget>ExportCsvButton (with default filenames)</Widget>
      <Widget>ExportExcelButton (with default filenames)</Widget>
      <Widget>Empty tables message (when no data)</Widget>
      <Widget>CTkProgressBar (shows export progress)</Widget>
      <Widget>CTkLabel (status messages during export)</Widget>
      <Flow>Select table → Configure filters → Export to CSV/Excel with progress</Flow>
      <Completed>Positional slicing support</Completed>
      <Completed>Default filename generation</Completed>
      <Completed>Progress bars for export operations</Completed>
      <Completed>Chunking for large CSV exports</Completed>
      <Issue>Empty tables message doesn't disappear after import</Issue>
    </ExportTab>

    <SearchTab>
      <Purpose>Advanced data search with filtering, sorting, and export capabilities</Purpose>
      <Widget>TableSelector (user-friendly names with validation)</Widget>
      <Widget>ColumnSelector (user-friendly labels, contextual to table)</Widget>
      <Widget>OperatorSelector (contextual to column type)</Widget>
      <Widget>SearchInput (with validation)</Widget>
      <Widget>SearchButton (enabled when valid input)</Widget>
      <Widget>ttk.Treeview (professional results table with sorting)</Widget>
      <Widget>ExportControls (CSV/Excel with scope options)</Widget>
      <Widget>ResultsInfo (showing count and limits)</Widget>
      <Flow>Select table → Select column → Choose operator → Enter value → Search → View/sort/export results</Flow>
      <Completed>Modular search mappings system</Completed>
      <Completed>Parameterized SQL queries with type conversion</Completed>
      <Completed>Case-insensitive text search</Completed>
      <Completed>Professional table with sorting and resizing</Completed>
      <Completed>Export functionality with scope options</Completed>
      <Completed>Input validation and error handling</Completed>
      <Planned>Multi-condition search (AND/OR)</Planned>
      <Planned>Pagination for large result sets</Planned>
      <Planned>Saved search functionality</Planned>
    </SearchTab>
  </Tabs>

  <!-- ─────────────────────────── 4  EVENT FLOW ──────────────────────────── -->
  <EventFlow>
    <Step>User selects S07 or RUC file type via radio buttons</Step>
    <Step>FileSelector adapts filter and button label</Step>
    <Step>User picks file via FileSelector</Step>
    <Step>ImportButton → ingestion_hooks.ingest_s07() or ingest_ruc() executes with progress callback</Step>
    <Step>Progress bar shows detailed status during import operation</Step>
    <Step>On success → LogTextBox shows row counts and database status</Step>
    <Step>Export buttons automatically enable if data exists</Step>
    <Step>User switches to Export tab</Step>
    <Step>User selects table and filtering options</Step>
    <Step>Export buttons → export_utils.export_*() execute with filters and progress</Step>
    <Step>User switches to Search tab</Step>
    <Step>User selects table (required validation)</Step>
    <Step>User selects column and operator</Step>
    <Step>User enters search value and clicks Search</Step>
    <Step>Results displayed in professional table with sorting capabilities</Step>
    <Step>User can export results with scope options (displayed vs all matching)</Step>
    <Issue>Empty tables message should refresh after successful import</Issue>
    <Issue>Database path consistency between IDE and executable environments</Issue>
  </EventFlow>

  <!-- ───────────────────────── 5  DATA INTERACTION ──────────────────────── -->
  <DataInteraction>
    <Engine>SQLAlchemy engine from settings.get_db_url()</Engine>
    <Database>
      <Development>SQLite (instance/database.db)</Development>
      <Production>PostgreSQL (configurable via DB_URL)</Production>
      <Persistence>Fixed - database now persists between runs in packaged app</Persistence>
      <Issue>Multiple database instances in different contexts (IDE vs executable)</Issue>
    </Database>
    <Tables>s07_header · s07_detalle · ruc_data</Tables>
    <Import>
      <S07>Fixed-width text file parsing with validation and progress reporting</S07>
      <RUC>CSV parsing with header normalization, schema filtering, and progress reporting</RUC>
      <Completed>Duplicate handling for RUC data</Completed>
      <Completed>Progress callbacks for long operations</Completed>
    </Import>
    <Export>
      <Options>
        <PositionalSlicing>Start row / Rows to export</PositionalSlicing>
        <HeaderFiltering>Latest import only (planned)</HeaderFiltering>
        <ScopeOptions>Displayed results only / All matching results (Search tab)</ScopeOptions>
      </Options>
      <Formats>pandas → CSV / Excel (xlsxwriter with openpyxl fallback)</Formats>
      <Completed>SQL query optimization and proper clause ordering</Completed>
      <Completed>Progress reporting for export operations</Completed>
      <Completed>Chunking for large CSV exports</Completed>
    </Export>
    <Search>
      <Implementation>Modular search_mappings.py for table/column mappings</Implementation>
      <QueryBuilding>Parameterized SQL with SQLAlchemy for safety</QueryBuilding>
      <TypeHandling>Automatic type conversion for text, number, and date fields</TypeHandling>
      <CaseInsensitive>COLLATE NOCASE for SQLite, LOWER() for other databases</CaseInsensitive>
      <ResultLimit>Up to 100 results displayed, with total count shown</ResultLimit>
      <Completed>Single-condition search with validation</Completed>
      <Planned>Multi-condition search capabilities</Planned>
    </Search>
  </DataInteraction>

  <!-- ──────────────────────── 6  ERROR HANDLING ─────────────────────────── -->
  <ErrorHandling>
    <Completed>Application-wide logging (console + s07_processor_gui.log)</Completed>
    <Completed>Uncaught exception logging and user notification</Completed>
    <Completed>Database initialization error handling</Completed>
    <Completed>Missing dependency graceful fallbacks (xlsxwriter → openpyxl)</Completed>
    <Completed>Search input validation and error messages</Completed>
    <Completed>Database query error handling with user feedback</Completed>
    <Planned>CTkMessageBox for fatal errors</Planned>
    <Planned>Database path consistency error handling</Planned>
  </ErrorHandling>

  <!-- ───────────────────────── 7  PACKAGING & DEPLOYMENT ─────────────────────────── -->
  <Packaging>
    <Tool>PyInstaller with custom build.spec</Tool>
    <Completed>All data files included (JSON, CSV, TXT, SQL)</Completed>
    <Completed>Dependency analysis and inclusion</Completed>
    <Completed>Database persistence in packaged app</Completed>
    <Completed>Cross-platform deployment testing</Completed>
    <Completed>Debug logging to confirm code inclusion</Completed>
    <Status>Production-ready packaging with data persistence</Status>
    <Issue>Database path handling needs improvement for consistent location</Issue>
  </Packaging>

  <!-- ───────────────────────── 8  TESTING & VALIDATION ─────────────────────────── -->
  <Testing>
    <Completed>Integration test suite (test_roundtrip.py)</Completed>
    <Completed>End-to-end import/export validation</Completed>
    <Completed>Database persistence verification</Completed>
    <Completed>Cross-database compatibility (SQLite/PostgreSQL)</Completed>
    <Completed>Search functionality testing</Completed>
    <Completed>Progress bar functionality verification</Completed>
    <Planned>GUI interaction tests (pytest-qt)</Planned>
    <Planned>Error scenario testing</Planned>
    <Planned>Multi-condition search testing</Planned>
  </Testing>

  <!-- ───────────────────────── 9  DEMO WORKFLOW ─────────────────────────── -->
  <Workflow>
    <Step>1. Launch GUI: python -m src.gui or packaged .exe</Step>
    <Step>2. Select S07 file type and choose sample_data/s07_medium_test1.txt</Step>
    <Step>3. Click Import → observe progress bar and row counts</Step>
    <Step>4. Switch to Export tab (buttons should be enabled)</Step>
    <Step>5. Select table and configure filters</Step>
    <Step>6. Click Export CSV/Excel → observe progress and choose save path</Step>
    <Step>7. Switch to Search tab</Step>
    <Step>8. Select table, column, operator, and search value</Step>
    <Step>9. View results in professional table with sorting</Step>
    <Step>10. Export search results with scope options</Step>
    <Step>11. Restart app → verify data persistence</Step>
  </Workflow>

  <!-- ─────────────────────── 10  CURRENT ISSUES & PRIORITIES ─────────────────────────────── -->
  <CurrentIssues>
    <Critical>
      <Issue>Database path inconsistency between IDE and executable environments</Issue>
      <Impact>Different database instances used, causing data loss and confusion</Impact>
      <Status>High priority - affects data persistence</Status>
      <Solution>Implement frozen state detection in get_db_path() function</Solution>
    </Critical>
    <High>
      <Issue>Empty tables message in export tab doesn't disappear after successful import</Issue>
      <Impact>Confusing UX - users see "no data" message even when data exists</Impact>
      <Status>Next priority to fix</Status>
      <Solution>Update export tab state management after successful imports</Solution>
    </High>
  </CurrentIssues>

  <NextSteps priority="high">
    <Item>
      <Title>Fix database path consistency</Title>
      <Benefit>Ensures data persistence across different execution contexts</Benefit>
      <Effort>Medium - implement frozen state detection and consistent path logic</Effort>
      <Code>
        def get_db_path():
            if getattr(sys, 'frozen', False):
                base_path = os.path.dirname(sys.executable)
            else:
                base_path = os.path.dirname(__file__)
            return os.path.join(base_path, 'instance', 'database.db')
      </Code>
    </Item>
    <Item>
      <Title>Fix empty tables message refresh</Title>
      <Benefit>Clear UX feedback after successful imports</Benefit>
      <Effort>Low - update export tab state management</Effort>
    </Item>
    <Item>
      <Title>Implement multi-condition search</Title>
      <Benefit>More powerful data exploration capabilities</Benefit>
      <Effort>Medium - extend search UI and query building logic</Effort>
    </Item>
    <Item>
      <Title>Add pagination for large search results</Title>
      <Benefit>Better navigation of large datasets</Benefit>
      <Effort>Medium - implement pagination controls and logic</Effort>
    </Item>
  </NextSteps>

  <NextSteps priority="medium">
    <Item>
      <Title>Error dialogs with CTkMessageBox</Title>
      <Benefit>Clearer error communication</Benefit>
      <Effort>Medium - implement error dialog system</Effort>
    </Item>
    <Item>
      <Title>Persistent user preferences</Title>
      <Benefit>Save/restore window size, sash position, and other settings</Benefit>
      <Effort>Medium - implement settings persistence system</Effort>
    </Item>
    <Item>
      <Title>Column selection for exports</Title>
      <Benefit>More targeted data export options</Benefit>
      <Effort>Medium - add column selection UI and logic</Effort>
    </Item>
    <Item>
      <Title>Saved search functionality</Title>
      <Benefit>Quick access to frequently used searches</Benefit>
      <Effort>High - implement search storage and retrieval system</Effort>
    </Item>
  </NextSteps>

  <!-- ─────────────────────── 11  TECHNICAL DEBT & CLEANUP ─────────────────────────────── -->
  <TechnicalDebt>
    <Item>Legacy test files need cleanup (marked with pytest.skip or deletion)</Item>
    <Item>Consider database migration system for schema updates</Item>
    <Item>Expand integration tests for edge cases</Item>
    <Item>Document deployment procedures for end users</Item>
    <Item>Add comprehensive unit tests for search functionality</Item>
    <Item>Implement database backup/restore functionality</Item>
    <Item>Consider performance optimization for large datasets</Item>
  </TechnicalDebt>

  <!-- ─────────────────────── 12  CROSS-DATABASE COMPATIBILITY ─────────────────────────────── -->
  <CrossDatabaseCompatibility>
    <Requirement>All features must work with both SQLite (development) and PostgreSQL (production)</Requirement>
    <Completed>Database-agnostic SQLAlchemy queries</Completed>
    <Completed>Case-insensitive search with database-specific implementations</Completed>
    <Completed>Schema compatibility between environments</Completed>
    <Planned>Database-specific feature detection and fallbacks</Planned>
    <Planned>Environment-specific configuration management</Planned>
    <Guidelines>
      <Rule>Write database-agnostic code when possible</Rule>
      <Rule>Mark database-specific code with clear comments</Rule>
      <Rule>Test all features in both environments</Rule>
      <Rule>Document any known behavioral differences</Rule>
    </Guidelines>
  </CrossDatabaseCompatibility>

</GuiContext>