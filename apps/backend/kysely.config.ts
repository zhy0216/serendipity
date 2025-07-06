import { defineConfig } from 'kysely-ctl';
import { db } from './src/db';

export default defineConfig({
  destroyOnExit: true, // optional. dictates whether the `kysely` instance should be destroyed when a command is finished executing. default is `true`.
  kysely: db,
  migrations: { migrationFolder: './src/migrations' },
});
