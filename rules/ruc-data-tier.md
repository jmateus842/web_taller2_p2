---
trigger: manual
---

Flexible Data Handling Rule (RUC version)
When working with external data sources where format and content may vary:

Prioritize accessibility over strict validation

Use flexible data types (VARCHAR, TEXT) instead of restrictive ones (ENUM) for fields that may contain unexpected values
Implement tiered validation:
Critical fields (IDs, keys): Must be valid
Important fields (status, categories): Try to normalize but accept originals
Informational fields: Accept as-is
Preserve original data alongside normalized versions when possible:
Store raw values in _raw fields
Use best-effort mapping with fallback to original values
Maintain extensibility with flexible storage (JSONB columns) for unexpected but potentially useful data
Document assumptions about what fields are essential vs. optional
This approach balances data quality with practical usability, allowing you to work with imperfect data while gradually improving your system's ability to handle variations over time.