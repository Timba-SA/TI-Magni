# Acceptance Criteria: Pagination and Excel Export (021)

## Scenario: Backend Pagination
- **Given** that there are more than 20 entities (Categorias, Usuarios, or Insumos) in the database.
- **When** a user requests the list via the GET `/` endpoint with `limit=10` and `skip=10`.
- **Then** the backend MUST return exactly 10 items.
- **And** the backend MUST include the `total` number of matching records in the response.

## Scenario: Backend Export
- **Given** a filtered state on the list view.
- **When** the user clicks "Exportar a Excel" triggering the GET `/exportar` endpoint.
- **Then** the backend MUST generate a `.xlsx` file containing all records matching the filters, ignoring pagination limits.
- **And** the file MUST have the correct headers and formatting.

## Scenario: Frontend Navigation
- **Given** a user viewing a list with multiple pages.
- **When** the user clicks the "Next" button on the `<Pagination />` component.
- **Then** the table MUST update to display the next set of results.
- **And** the page number in the UI MUST update accordingly.

## Scenario: Frontend Export Action
- **Given** a user on any of the main data pages (Insumos, Categorias, Usuarios).
- **When** they trigger the export action.
- **Then** the browser MUST start downloading the `.xlsx` file directly from the server.
