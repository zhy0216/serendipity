import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Create searchResults table
  await db.schema
    .createTable('SearchResult')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('keyword', 'varchar', (col) => col.notNull())
    .addColumn('model', 'varchar', (col) => col.notNull())
    .addColumn('result', 'json')
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create index on keyword for better search performance
  await db.schema
    .createIndex('searchResult_keyword_idx')
    .on('SearchResult')
    .column('keyword')
    .execute();

  // Create keywordClicks table to track user clicks
  await db.schema
    .createTable('KeywordClickLog')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('keyword', 'varchar', (col) => col.notNull())
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute();

  // Create index on createdAt for better search performance
  await db.schema
    .createIndex('keywordClickLog_createdAt_idx')
    .on('KeywordClickLog')
    .column('createdAt')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Drop indexes first
  await db.schema.dropIndex('searchResult_keyword_idx').execute();
  await db.schema.dropIndex('keywordClickLog_createdAt_idx').execute();

  // Drop tables
  await db.schema.dropTable('KeywordClickLog').execute();
  await db.schema.dropTable('SearchResult').execute();
}
