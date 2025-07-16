---
trigger: manual
description: When implementing changes in the program or the database take this information into consideration for better accuracy
---

<PROJECT_CONTEXT> Python 3.13 in virtual environment (.venv) psycopg2-binary - PostgreSQL adapter for Python pandas - Data manipulation library Other standard libraries (os, json) PostgreSQL 17 - Enterprise-grade relational database

<DATA_ARCHITECTURE> <SOURCE_FORMAT>Pipe-delimited (|) CSV files from Ecuador's SRI tax authority</SOURCE_FORMAT> <DATA_CLASSIFICATION> <CRITICAL_FIELDS>Strictly validated (e.g., NUMERO_RUC, RAZON_SOCIAL)</CRITICAL_FIELDS> <IMPORTANT_FIELDS>Normalized but preserve originals (e.g., ESTADO_CONTRIBUYENTE)</IMPORTANT_FIELDS> <INFORMATIONAL_FIELDS>Accept as-is with minimal validation</INFORMATIONAL_FIELDS> </DATA_CLASSIFICATION> <DESIGN_PRINCIPLE>Flexible Data Handling Rule - prioritize accessibility over strict validation</DESIGN_PRINCIPLE> </DATA_ARCHITECTURE>

<CODE_STRUCTURE> CSV file parsing with delimiter detection Constants for field names and categories Database operations (needs PostgreSQL implementation) Basic test coverage for parser functionality ruc_fields.md - Field descriptions and categories ruc_field_examples.md - Example values and validation rules </CODE_STRUCTURE>

<LEARNING_CONTEXT> First-time developer with no formal CS education Practical implementation over theoretical concepts Clear comments and explanations in code Build understanding while creating functional system </LEARNING_CONTEXT> </PROJECT_CONTEXT>