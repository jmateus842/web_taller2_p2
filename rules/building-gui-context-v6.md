---
trigger: manual
---

<GuiContext version="6">

  <!-- ───────────────────────── 1  PURPOSE & SCOPE ───────────────────────── -->
  <Purpose>
    <Goal>Production-ready desktop application for S07 / RUC data import, validation, search, and export with persistent data storage, cross-database compatibility, and advanced user experience.</Goal>
    <Audience>End users, data analysts, insurance professionals requiring sophisticated data exploration capabilities.</Audience>
    <Stack>Python 3.11 · customtkinter · SQLAlchemy · PyInstaller · ttk.Treeview.</Stack>
    <Status>Core functionality complete, advanced search capabilities with AND/OR logic implemented, cross-database compatibility ensured, packaging working, data persistence fixed, complex logical grouping operational.</Status>
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
      <Purpose>Advanced data search with complex logical filtering, grouping, and export capabilities</Purpose>
      <Widget>TableSelector (user-friendly names with validation)</Widget>
      <Widget>MultiConditionRows (AND/OR connectors, NOT checkbox, column/operator/value)</Widget>
      <Widget>AddConditionButton (adds new condition row)</Widget>
      <Widget>RemoveConditionButtons (for each additional row)</Widget>
      <Widget>GroupingControls (Create group, Ungroup buttons with visual feedback)</Widget>
      <Widget>VisualGroupingIndicators (┌─, ├─, └─ connectors showing logical structure)</Widget>
      <Widget>TreeStructureBuilder (Advanced logic for proper SQL generation)</Widget>
      <Widget>ColumnPickerButton ("Select columns..." for display/export)</Widget>
      <Widget>SearchButton (enabled when valid input)</Widget>
      <Widget>ttk.Treeview (professional results table with sorting)</Widget>
      <Widget>ExportControls (CSV/Excel with scope options)</Widget>
      <Widget>ResultsInfo (showing count and limits)</Widget>
      <Flow>Select table → Build conditions → Group conditions → Search → View/sort/export results</Flow>
      <Completed>Modular search mappings system</Completed>
      <Completed>Advanced tree structure building with operator precedence</Completed>
      <Completed>Visual grouping system with automatic cleanup</Completed>
      <Completed>Proper AND/OR logic implementation</Completed>
      <Completed>Group creation and ungrouping workflow</Completed>
      <Completed>NOT condition support for negation</Completed>
      <Completed>Column picker for display/export customization</Completed>
      <Completed>Parameterized SQL queries with type conversion</Completed>
      <Completed>Case-insensitive text search</Completed>
      <Completed>Professional table with sorting and resizing</Completed>
      <Completed>Export functionality with scope options</Completed>
      <Completed>Input validation and error handling</Completed>
      <Planned>Nested grouping (groups within groups)</Planned>
      <Planned>Drag-and-drop reordering</Planned>
      <Planned>Group naming/labeling</Planned>
      <Planned>Pagination for large result sets</Planned>
      <Planned>Saved search functionality</Planned>
      <Planned>Distinct value helper</Planned>
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
    <Step>User builds search conditions (AND/OR/NOT)</Step>
    <Step>User creates logical groups by selecting conditions and clicking "Create Group"</Step>
    <Step>User observes visual grouping indicators (┌─, ├─, └─)</Step>
    <Step>User tests ungrouping functionality</Step>
    <Step>User selects display columns via column picker</Step>
    <Step>User clicks Search</Step>
    <Step>Results displayed in professional table with sorting capabilities</Step>
    <Step>User can export results with scope options and respecting column selection</Step>
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
    <Tables>
      <MainTables>s07_header · s07_detalle · ruc_data</MainTables>
      <ReferenceTables>17 s07_ref_* tables for user-friendly lookups</ReferenceTables>
      <CrossDatabaseCompatibility>Both SQLite and PostgreSQL schemas aligned for consistent experience</CrossDatabaseCompatibility>
    </Tables>
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
        <ColumnSelection>Custom column selection for targeted exports</ColumnSelection>
      </Options>
      <Formats>pandas → CSV / Excel (xlsxwriter with openpyxl fallback)</Formats>
      <Completed>SQL query optimization and proper clause ordering</Completed>
      <Completed>Progress reporting for export operations</Completed>
      <Completed>Chunking for large CSV exports</Completed>
      <Completed>Column selection respect in exports</Completed>
    </Export>
    <Search>
      <Implementation>Modular search_mappings.py for table/column mappings</Implementation>
      <QueryBuilding>Parameterized SQL with SQLAlchemy for safety</QueryBuilding>
      <TypeHandling>Automatic type conversion for text, number, and date fields</TypeHandling>
      <CaseInsensitive>COLLATE NOCASE for SQLite, LOWER() for other databases</CaseInsensitive>
      <ResultLimit>Up to 100 results displayed, with total count shown</ResultLimit>
      <Completed>Advanced tree structure building with operator precedence</Completed>
      <Completed>Multi-condition search with AND/OR/NOT logic</Completed>
      <Completed>Column selection for display and export</Completed>
      <Completed>Visual grouping system with automatic cleanup</Completed>
      <Planned>Pagination for large result sets</Planned>
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
    <Completed>Tree structure error handling and validation</Completed>
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
    <Completed>Search functionality testing (including multi-condition)</Completed>
    <Completed>Progress bar functionality verification</Completed>
    <Completed>Column selection and export validation</Completed>
    <Completed>Schema comparison tool for cross-database validation</Completed>
    <Planned>Comprehensive testing of complex AND/OR tree structures</Planned>
    <Planned>GUI interaction tests (pytest-qt)</Planned>
    <Planned>Error scenario testing</Planned>
    <Planned>Performance testing for large numbers of grouped conditions</Planned>
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
    <Step>8. Select table, build multiple search conditions with AND/OR/NOT</Step>
    <Step>8a. Create logical groups by selecting conditions and clicking "Create Group"</Step>
    <Step>8b. Observe visual grouping indicators (┌─, ├─, └─)</Step>
    <Step>8c. Test ungrouping functionality</Step>
    <Step>9. Click "Select columns..." to customize displayed fields</Step>
    <Step>10. View results in professional table with sorting</Step>
    <Step>11. Export search results with scope options and column selection</Step>
    <Step>12. Restart app → verify data persistence</Step>
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
      <Status>Still critical - affects data persistence</Status>
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
      <Title>Testing & validation of AND/OR logic</Title>
      <Benefit>Ensures complex search functionality works reliably</Benefit>
      <Effort>Medium - comprehensive testing of tree structures</Effort>
      <Status>New priority - protect recent complex implementation</Status>
    </Item>
    <Item>
      <Title>Simple UI enhancements</Title>
      <Benefit>Improve user experience without overwhelming complexity</Benefit>
      <Effort>Low-Medium - color coding, collapse/expand</Effort>
      <Status>Build confidence with manageable features</Status>
    </Item>
    <Item>
      <Title>Fix empty tables message refresh</Title>
      <Benefit>Clear UX feedback after successful imports</Benefit>
      <Effort>Low - update export tab state management</Effort>
    </Item>
  </NextSteps>

  <NextSteps priority="medium">
    <Item>
      <Title>Implement result pagination</Title>
      <Benefit>Better navigation of large result sets</Benefit>
      <Effort>Medium - add paging controls and logic</Effort>
    </Item>
    <Item>
      <Title>Add distinct value helper</Title>
      <Benefit>Quick access to valid column values for search</Benefit>
      <Effort>Medium - implement popup with distinct values query</Effort>
    </Item>
    <Item>
      <Title>Error dialogs with CTkMessageBox</Title>
      <Benefit>Clearer error communication</Benefit>
      <Effort>Medium - implement error dialog system</Effort>
    </Item>
    <Item>
      <Title>Persistent user preferences</Title>
      <Benefit>Save/restore window size, sash position, column selections</Benefit>
      <Effort>Medium - implement settings persistence system</Effort>
    </Item>
  </NextSteps>

  <NextSteps priority="low">
    <Item>
      <Title>Saved/recent queries</Title>
      <Benefit>Quick access to frequently used searches</Benefit>
      <Effort>High - implement search storage and retrieval system</Effort>
    </Item>
    <Item>
      <Title>Nested grouping (groups within groups)</Title>
      <Benefit>Support for complex logical structures</Benefit>
      <Effort>High - extend tree building logic for nested structures</Effort>
    </Item>
    <Item>
      <Title>Drag-and-drop reordering</Title>
      <Benefit>Intuitive condition reordering</Benefit>
      <Effort>High - implement drag-and-drop GUI functionality</Effort>
    </Item>
    <Item>
      <Title>Group naming/labeling</Title>
      <Benefit>Better organization of complex searches</Benefit>
      <Effort>Medium - add labeling system to groups</Effort>
    </Item>
  </NextSteps>

  <!-- ─────────────────────── 11  TECHNICAL DEBT & CLEANUP ─────────────────────────────── -->
  <TechnicalDebt>
    <Item>Add comprehensive tests for complex AND/OR tree structures</Item>
    <Item>Performance optimization for large numbers of grouped conditions</Item>
    <Item>Consider refactoring tree building logic for better maintainability</Item>
    <Item>Document the grouping system for future developers</Item>
    <Item>Legacy test files need cleanup (marked with pytest.skip or deletion)</Item>
    <Item>Consider database migration system for schema updates</Item>
    <Item>Expand integration tests for edge cases</Item>
    <Item>Document deployment procedures for end users</Item>
    <Item>Implement database backup/restore functionality</Item>
    <Item>Consider performance optimization for large datasets</Item>
  </TechnicalDebt>

  <!-- ─────────────────────── 12  LEARNING MILESTONES ─────────────────────────────── -->
  <LearningMilestones>
    <Milestone>
      <Title>Complex UI Logic Implementation</Title>
      <Achievement>Successfully implemented tree structure building for logical operations</Achievement>
      <Skills>Advanced GUI programming, tree data structures, SQL generation</Skills>
      <Date>2025-01-18</Date>
      <Impact>Demonstrated ability to handle complex logical systems and user interactions</Impact>
    </Milestone>
    <Milestone>
      <Title>State Management Mastery</Title>
      <Achievement>Proper handling of complex UI state with visual feedback</Achievement>
      <Skills>Event-driven programming, state synchronization, user feedback</Skills>
      <Date>2025-01-18</Date>
      <Impact>Created robust, user-friendly interface that handles complex interactions gracefully</Impact>
    </Milestone>
    <Milestone>
      <Title>Advanced Search System Design</Title>
      <Achievement>Built sophisticated search capabilities with AND/OR logic and grouping</Achievement>
      <Skills>Query building, logical operators, user experience design</Skills>
      <Date>2025-01-18</Date>
      <Impact>Delivered professional-grade search functionality comparable to commercial applications</Impact>
    </Milestone>
  </LearningMilestones>

  <!-- ─────────────────────── 13  CROSS-DATABASE COMPATIBILITY ─────────────────────────────── -->
  <CrossDatabaseCompatibility>
    <Requirement>All features must work with both SQLite (development) and PostgreSQL (production)</Requirement>
    <Completed>Database-agnostic SQLAlchemy queries</Completed>
    <Completed>Case-insensitive search with database-specific implementations</Completed>
    <Completed>Schema compatibility between environments</Completed>
    <Completed>Reference tables aligned between SQLite and PostgreSQL</Completed>
    <Completed>Schema comparison tool for validation</Completed>
    <Completed>Advanced search logic works across both database types</Completed>
    <Planned>Database-specific feature detection and fallbacks</Planned>
    <Planned>Environment-specific configuration management</Planned>
    <Guidelines>
      <Rule>Write database-agnostic code when possible</Rule>
      <Rule>Mark database-specific code with clear comments</Rule>
      <Rule>Test all features in both environments</Rule>
      <Rule>Document any known behavioral differences</Rule>
    </Guidelines>
  </CrossDatabaseCompatibility>

  <!-- ─────────────────────── 14  SCHEMA MANAGEMENT ─────────────────────────────── -->
  <SchemaManagement>
    <Tools>
      <Tool>
        <Name>Schema Comparison Tool</Name>
        <Path>scripts/compare_schemas.py</Path>
        <Purpose>Compare PostgreSQL and SQLite schemas to identify differences</Purpose>
        <Features>
          <Feature>Table existence verification</Feature>
          <Feature>Column comparison</Feature>
          <Feature>Reference table status reporting</Feature>
          <Feature>SQLite schema generation from PostgreSQL</Feature>
        </Features>
      </Tool>
    </Tools>
    <Strategy>
      <Step>Maintain PostgreSQL schema as source of truth</Step>
      <Step>Use comparison tool to identify differences</Step>
      <Step>Update SQLite schema to match PostgreSQL</Step>
      <Step>Document intentional differences (e.g., ruc_data_history)</Step>
      <Step>Verify compatibility through integration tests</Step>
    </Strategy>
    <IntentionalDifferences>
      <Difference>
        <Table>ruc_data_history</Table>
        <Reason>PostgreSQL-specific audit table with triggers not applicable to SQLite</Reason>
        <Impact>No audit history in development, only in production</Impact>
      </Difference>
    </IntentionalDifferences>
  </SchemaManagement>

</GuiContext>