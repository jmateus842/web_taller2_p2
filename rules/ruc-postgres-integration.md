---
trigger: manual
---

<RUC_POSTGRESQL_INTEGRATION>
  <STORAGE_STRATEGY>
    <PRINCIPLE>Hybrid Storage Approach - Balance structure with flexibility</PRINCIPLE>
    <IMPLEMENTATION>
      <CRITICAL_FIELDS type="dedicated_columns" validation="strict">
        NUMERO_RUC, RAZON_SOCIAL
      </CRITICAL_FIELDS>
      <IMPORTANT_FIELDS type="dedicated_columns" store_both_versions="true">
        ESTADO_CONTRIBUYENTE, CLASE_CONTRIBUYENTE, TIPO_CONTRIBUYENTE
      </IMPORTANT_FIELDS>
      <INFORMATIONAL_FIELDS type="jsonb_column" name="datos_adicionales">
        All remaining fields from CSV
      </INFORMATIONAL_FIELDS>
    </IMPLEMENTATION>
  </STORAGE_STRATEGY>
  
  <DATA_FLOW>
    <STEP order="1" module="parser.py">Read CSV files with automatic delimiter detection</STEP>
    <STEP order="2" module="integration.py">Transform data according to field importance</STEP>
    <STEP order="3" module="db.py">Store in PostgreSQL with batch processing</STEP>
  </DATA_FLOW>
  
  <USER_EXPERIENCE>
    <PRINCIPLE>Hide technical complexity while preserving data integrity</PRINCIPLE>
    <FEATURES>
      <FEATURE>Transparent access to all fields regardless of storage location</FEATURE>
      <FEATURE>Error-tolerant processing of non-critical fields</FEATURE>
      <FEATURE>Efficient querying of both structured and flexible data</FEATURE>
      <FEATURE>Future-proof against changes in SRI data format</FEATURE>
    </FEATURES>
  </USER_EXPERIENCE>
</RUC_POSTGRESQL_INTEGRATION>