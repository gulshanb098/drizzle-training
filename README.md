# Drizzle ORM with SQLite

This project uses [Drizzle ORM](https://orm.drizzle.team/docs/get-started/sqlite-new) with SQLite as the database.

## Installation

Ensure you have Node.js installed, then install the necessary dependencies:

```sh
npm i drizzle-orm @libsql/client dotenv
npm i -D drizzle-kit tsx
```

## Running the Index File

To execute your `index.ts` file, use:

```sh
npx tsx src/index.ts
```
(If using TypeScript, compile it first: `tsc && node index.js`)

## Drizzle Kit Commands

### Generate Migrations

```sh
npx drizzle-kit generate --name=add_example_table
```

### Apply Migrations

```sh
npx drizzle-kit migrate
```

## Drizzle Studio

Drizzle provides a built-in studio for database exploration:

```sh
npx drizzle-kit studio
```

## VS Code Extensions

For better development experience, install these VS Code extensions:

- **SQLite Viewer** - To inspect SQLite databases.
- **Drizzle ORM Snippets** - To get useful Drizzle ORM code snippets.

## Environment Variables

Create a `.env` file and specify the database path:

```
DATABASE_URL=file:local.db
```

## License

This project is licensed under the MIT License.

