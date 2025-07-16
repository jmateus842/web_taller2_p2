---
trigger: manual
description: When trying to decide which files are the correct ones when working with anything related to the s07 structure
---

# Project Summary: S07 Parser for Insurance Data

## Data Source
- Ecuador’s S07 TXT files
- Latin1 encoding, tab-delimited
- First line is metadata (not headers)
- Schema/validation rules from official S07 manual

## Validation Tiers
- **Critical**: must be valid (reject row)
- **Important**: warn but keep row
- **Informational**: accept even if malformed

## Schema & Parsers
- JSON schema: `flexible_s07_structure.json`
- Parser: `src/ruc_processor/s07_parser.py`
- Validator: `src/ruc_processor/s07_compact_validator.py`

## Project Layout
- Codebase: `src/ruc_processor/`
- Shared utils: `common/`
- Logging/config: already set up

## Current Status
- Successfully parsed 100K records
- Only 117 had 1 missing "important" field (`codigo_parentesco_contratante`)
- No "critical" field errors

## Next Steps
- Export invalid rows
- Design database schema
- Refine validation/output

## Developer Profile
- Self-taught, new to professional coding
- Prefers simple, step-by-step, analogy-driven help
- Wants to build confidence and independence

## How the LLM Can Help
- Explain the *why*
- Be practical and clear
- Provide hands-on code and examples
- Help with validation, error handling, DB design, and structure