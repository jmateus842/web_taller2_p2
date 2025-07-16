Here's the context I would provide to an LLM implementing the macro plan guide:

## System Context for LLM Implementation

### Project Overview
You are working on a Python-based insurance data management system with a GUI built using CustomTkinter. The system allows users to search through insurance data (S07, RUC, Broker tables) using complex multi-condition queries with AND/OR logic and grouping.

### Current Architecture
- **GUI Framework**: CustomTkinter (modern tkinter wrapper)
- **Database**: SQLite (development) / PostgreSQL (production) via SQLAlchemy
- **Search Logic**: Tree-based query builder in `src/gui/search_logic.py`
- **Main GUI**: `src/gui/main_window.py` contains the search interface
- **Current UI**: Row-based conditions with manual grouping buttons

### Key Files to Understand
```
src/gui/
├── main_window.py          # Main GUI with current search interface
├── search_logic.py         # Tree-based query building logic
└── search_mappings.py      # Column/table display name mappings
```

### Current Search UI Pattern
```python
# Current: Simple row-based approach
[Checkbox] Column: Status | Operator: equals | Value: Active | [NOT] [AND▼]
[Checkbox] Column: Type   | Operator: equals | Value: Corp   | [NOT] [OR▼]
```

### Target UI Pattern (Macro Plan)
```
▼ AND                    # Header strip (root operator toggle)
┌─ Status equals Active   # Condition with group gutter
├─────────────────────── 
│  ▼ OR ↓                # Operator-between-rows
├───────────────────────
├─ Type equals Individual # Nested condition
├─────────────────────── 
│  ▼ OR ↓                # Another operator row
├───────────────────────
└─ Type equals Corporate  # Last condition in group
```

### Critical Constraints
1. **Backward Compatibility**: Existing search logic (`SearchLogicTree`, `LogicNode`) must remain functional
2. **Database Agnostic**: SQL generation must work with both SQLite and PostgreSQL
3. **User Experience**: Changes should feel intuitive, not overwhelming
4. **Performance**: UI must remain responsive with 50+ conditions
5. **Accessibility**: Keyboard navigation and screen reader support

### Technical Debt Context
- **Watchlist Areas**: The codebase has identified fragile areas (see `watchlist.md`)
- **Recent Fixes**: Broker search data type issues were recently resolved
- **Testing**: Limited automated tests exist; manual testing is primary validation method

### User Profile Context
- **Target Users**: Insurance data analysts, semi-technical users
- **Usage Patterns**: Complex searches with 5-15 conditions, frequent grouping operations
- **Pain Points**: Current grouping is manual and not visually intuitive
- **Skill Level**: Comfortable with Excel-like interfaces, not programmers

### Implementation Philosophy
- **Incremental Development**: Build and test each component before moving to next
- **User-Centric Design**: Visual clarity over technical sophistication
- **Defensive Programming**: Assume user input will be unexpected
- **Clear Error Messages**: Users should understand what went wrong and how to fix it

### Development Environment
- **Python 3.9+** with virtual environment
- **Dependencies**: CustomTkinter, SQLAlchemy, pandas, openpyxl
- **Testing**: Manual GUI testing, some automated logic tests
- **Packaging**: PyInstaller for standalone executable

### Code Style Guidelines
- **Naming**: Use clear, descriptive names (`_add_group_connector` not `_agc`)
- **Documentation**: Docstrings for all public methods
- **Error Handling**: Graceful degradation, never crash the GUI
- **Logging**: Use the existing logging system for debugging

### State Management Complexity
The macro plan requires tracking:
- **Visual State**: How conditions appear on screen (order, nesting, colors)
- **Logical State**: How conditions translate to SQL (precedence, grouping)
- **User State**: What's selected, what's being dragged, what's collapsed
- **Synchronization**: Keeping all three states consistent

### Critical Success Factors
1. **Visual Hierarchy**: Users must immediately understand the logical structure
2. **Drag-and-Drop**: Must feel natural and provide clear feedback
3. **Operator Precedence**: Visual arrangement must match SQL logic
4. **Error Prevention**: Invalid states should be impossible to create
5. **Performance**: No lag during visual operations

### Testing Strategy Context
- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test GUI-to-SQL conversion accuracy
- **User Acceptance**: Test with actual complex search scenarios
- **Regression Tests**: Ensure existing functionality isn't broken

### Rollback Plan
If implementation becomes too complex:
- **Phase 1**: Enhanced visual grouping (gutters, colors)
- **Phase 2**: Operator-between-rows
- **Phase 3**: Advanced features (drag-drop, nesting)
- **Fallback**: Improve current system instead of complete redesign

This context ensures the implementing LLM understands both the technical requirements and the broader project constraints, user needs, and risk factors involved in the macro plan implementation.