---
trigger: manual
---

# Database Architecture Context

## Environment Configuration
- **Production**: PostgreSQL database
  - Schema defined in [sql/schema_pg.sql](cci:7://file:///c:/Projects/Assicurazioni_Colombo/traductor_estructuras_seguros_validacion_hibrida/sql/schema_pg.sql:0:0-0:0)
  - Uses advanced features (triggers, PL/pgSQL functions)
  - Includes audit logging and security features
- **Development/Testing**: SQLite database
  - Simplified for local development
  - May not support all PostgreSQL features

## Important Considerations
1. **Cross-Database Compatibility**:
   - All database operations must be compatible with both PostgreSQL and SQLite
   - Avoid using database-specific features without fallbacks
   - Test all queries in both environments

2. **Schema Differences**:
   - The PostgreSQL schema is the source of truth
   - Any schema changes must be reflected in both databases
   - Document any required schema modifications for SQLite

3. **Development Guidelines**:
   - Write database-agnostic code when possible
   - Clearly mark any database-specific code with comments
   - Include environment checks for database-specific features

4. **Testing**:
   - Unit tests should run against SQLite
   - Integration tests should verify PostgreSQL compatibility
   - Document any known differences in behavior

## When Making Changes
- Consider the impact on both database backends
- Document any assumptions about database features
- Include appropriate error handling for database-specific operations