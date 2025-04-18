# TS Node Project with Testing

This is a Node.js project with TypeScript and testing setup.

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

## Testing

This project uses Jest for unit and integration testing.

### Running All Tests

```bash
npm test
```

### Running Tests in Watch Mode

```bash
npm run test:watch
```

## Test Structure

- **Unit Tests**: Simple unit tests in `/src/utils/__tests__`
- **Route Tests**: API integration tests in `/src/routes/__tests__`

## Implementation Details

Tests use:
- **Jest** as the test framework
- **Supertest** for HTTP assertions
- **MongoDB Memory Server** for database testing

The test environment doesn't require a real MongoDB connection as it uses an in-memory version for testing. 