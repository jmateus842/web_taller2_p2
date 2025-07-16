---
trigger: manual
---

---
trigger: manual
---

<GuiContext version="1">

  <!-- ───────────────────────── 1  PURPOSE & SCOPE ───────────────────────── -->
  <Purpose>
    <Goal>Demonstrate end-to-end S07 / RUC import & export through a desktop GUI.</Goal>
    <Audience>Product owner, QA, demo users.</Audience>
    <Stack>Python 3.11 · customtkinter · SQLAlchemy.</Stack>
  </Purpose>

  <!-- ──────────────────────── 2  MAIN SCREENS / WIDGETS ─────────────────── -->
  <Screens>
    <MainWindow file="src/gui/main_window.py">
      <Widget>FileSelectorButton</Widget>
      <Widget>ImportButton</Widget>
      <Widget>ExportCsvButton</Widget>
      <Widget>ExportExcelButton</Widget>
      <Widget>LogTextBox</Widget>
      <Planned>ProgressBar (indeterminate)</Planned>
      <Planned>StatusBar (success / error)</Planned>
    </MainWindow>
  </Screens>

  <!-- ─────────────────────────── 3  EVENT FLOW ──────────────────────────── -->
  <EventFlow>
    <Step>User picks file via FileSelector.</Step>
    <Step>ImportButton → ingestion_hooks.ingest_*() executes.</Step>
    <Step>On success → LogTextBox & StatusBar update.</Step>
    <Step>Export buttons → export_utils.export_*() execute.</Step>
  </EventFlow>

  <!-- ───────────────────────── 4  DATA INTERACTION ──────────────────────── -->
  <DataInteraction>
    <Engine>SQLAlchemy engine from settings.get_db_url()</Engine>
    <Tables>s07_header · s07_detalle · ruc_data.</Tables>
    <Export>pandas → CSV / Excel.</Export>
  </DataInteraction>

  <!-- ──────────────────────── 5  ERROR HANDLING ─────────────────────────── -->
  <ErrorHandling>
    <Try>Import/Export wrapped in try/except.</Try>
    <Dialog>ctk.CTkMessageBox for fatal errors (planned).</Dialog>
    <Log>Messages appended to LogTextBox.</Log>
  </ErrorHandling>

  <!-- ───────────────────────── 6  DEMO WORKFLOW ─────────────────────────── -->
  <Workflow>
    <Step>1. Launch GUI:  python -m src.gui</Step>
    <Step>2. Select sample_data/s07_medium_test1.txt.</Step>
    <Step>3. Click Import → observe “Import completed”.</Step>
    <Step>4. Click Export CSV → choose save path.</Step>
    <Step>5. Open the exported file to verify.</Step>
  </Workflow>

  <!-- ──────────────────────── 7  TESTING TOOLS ──────────────────────────── -->
  <TestingTools>
    <Plan>pytest tests/test_gui_import.py (uses pytest-tkinter).</Plan>
    <Manual>Smoke checklist included in README.</Manual>
  </TestingTools>

  <!-- ─────────────────────── 8  NEXT STEPS ──────────────────────────────── -->
  <NextSteps priority="medium">
    <Item>
      <Title>StatusBar & Progress spinner</Title>
      <Benefit>Gives user feedback during long imports.</Benefit>
    </Item>
    <Item>
      <Title>Error dialogs</Title>
      <Benefit>Clearer UX on failures.</Benefit>
    </Item>
    <Item>
      <Title>PostgreSQL backend test</Title>
      <Benefit>Verify DB switch with same GUI.</Benefit>
    </Item>
  </NextSteps>

</GuiContext>