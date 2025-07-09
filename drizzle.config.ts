import {defineConfig} from 'drizzle-kit';

// get the database url from the environment variable
const databaseUrl = process.env.DATABASE_URL;

// check if the database url is defined
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}
// export the drizzle config
export default defineConfig({
  // path to the schema file
  schema: './src/drizzle/schema.ts',
  // output directory for the generated types
  out: './drizzle/migrations',
  // specify sql dialect
  dialect: 'postgresql',
  // enable strict mode for type safety
  strict: true,
  // enable verbose logging to get more info during cli actions
  verbose: true,
  // pass db credentials like connection string
  dbCredentials: {
    url: databaseUrl,
  },
});