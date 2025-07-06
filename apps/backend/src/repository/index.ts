import { db } from '../db';
import { SearchResult, KeywordClickLog } from '@serendipity/types';

// SearchResult repository functions
export async function createSearchResult(
  data: Omit<SearchResult, 'id' | 'createdAt'>
) {
  return await db.insertInto('SearchResult').values(data).execute();
}

export async function findSearchResultById(id: number) {
  return await db
    .selectFrom('SearchResult')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function findSearchResultsByKeyword(keyword: string) {
  return await db
    .selectFrom('SearchResult')
    .selectAll()
    .where('keyword', '=', keyword)
    .orderBy('createdAt', 'desc')
    .executeTakeFirst();
}

export async function findAllSearchResults() {
  return await db
    .selectFrom('SearchResult')
    .selectAll()
    .orderBy('createdAt', 'desc')
    .execute();
}

export async function updateSearchResult(
  id: number,
  data: Partial<Omit<SearchResult, 'id' | 'createdAt'>>
) {
  return await db
    .updateTable('SearchResult')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function deleteSearchResult(id: number) {
  return await db
    .deleteFrom('SearchResult')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

// KeywordClickLog repository functions
export async function createKeywordClickLog(
  data: Omit<KeywordClickLog, 'id' | 'createdAt'>
) {
  return await db
    .insertInto('KeywordClickLog')
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findKeywordClickLogById(id: number) {
  return await db
    .selectFrom('KeywordClickLog')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function findKeywordClickLogsByKeyword(keyword: string) {
  return await db
    .selectFrom('KeywordClickLog')
    .selectAll()
    .where('keyword', '=', keyword)
    .orderBy('createdAt', 'desc')
    .execute();
}

export async function findAllKeywordClickLogs() {
  return await db
    .selectFrom('KeywordClickLog')
    .selectAll()
    .orderBy('createdAt', 'desc')
    .execute();
}

export async function deleteKeywordClickLog(id: number) {
  return await db
    .deleteFrom('KeywordClickLog')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}

export async function getKeywordClickStats(keyword?: string) {
  let query = db
    .selectFrom('KeywordClickLog')
    .select(['keyword', db.fn.count('id').as('clickCount')])
    .groupBy('keyword')
    .orderBy('clickCount', 'desc');

  if (keyword) {
    query = query.where('keyword', '=', keyword);
  }

  return await query.execute();
}

export async function getLastKeywords(limit: number): Promise<string[]> {
  const result = await db
    .selectFrom('KeywordClickLog')
    .select(['keyword', 'createdAt'])
    .distinctOn('keyword')
    .orderBy('keyword')
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .execute();
  return result.map((item) => item.keyword);
}
