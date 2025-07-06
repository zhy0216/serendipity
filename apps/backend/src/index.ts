import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { streamSSE } from 'hono/streaming';
import { getMindMap } from './utils';
import {
  createSearchResult,
  findSearchResultsByKeyword,
  createKeywordClickLog,
  getLastKeywords,
} from './repository';

const app = new Hono();

app.get('/', (c) => c.text('Hono!'));

app.get('/api/mindMap', async (c) => {
  const keyword = c.req.query('keyword');
  if (!keyword) {
    return c.json({ error: 'Keyword is required' }, 400);
  }

  const searchResult = await findSearchResultsByKeyword(keyword);
  if (searchResult) {
    return streamSSE(c, async (stream) => {
      await stream.writeSSE({
        data: JSON.stringify(searchResult.result),
        event: 'chunk',
      });
      await stream.writeSSE({
        data: 'done',
        event: 'complete',
      });
    });
  }

  return streamSSE(c, async (stream) => {
    let completeResult = '';

    try {
      const generator = getMindMap(keyword);

      for await (const chunk of generator) {
        completeResult += chunk;
        await stream.writeSSE({
          data: chunk,
          event: 'chunk',
        });
      }

      // Save the complete result to database
      try {
        const mindMapData = JSON.parse(completeResult);
        await createSearchResult({
          keyword,
          model: process.env.AI_MODEL as string,
          result: mindMapData,
        });
        console.log(`Saved search result for keyword: ${keyword}`);
      } catch (saveError) {
        console.error('Error saving search result:', saveError);
        console.log('####### completeResult:', completeResult);
      }

      await stream.writeSSE({
        data: 'done',
        event: 'complete',
      });
    } catch (error) {
      console.error('Error in streaming:', error);
      await stream.writeSSE({
        data: 'Streaming failed',
        event: 'error',
      });
    }
  });
});

app.post('/api/keywordClickLog', async (c) => {
  try {
    const body = await c.req.json();
    const { keyword } = body;

    if (!keyword) {
      return c.json({ error: 'Keyword is required' }, 400);
    }

    const clickLog = await createKeywordClickLog({
      keyword,
    });

    return c.json({ success: true, id: clickLog.id });
  } catch (error) {
    console.error('Error logging keyword click:', error);
    return c.json({ error: 'Failed to log keyword click' }, 500);
  }
});

app.get('/api/getLastKeywords', async (c) => {
  try {
    const limit = c.req.query('limit') || 10;
    const keywords = await getLastKeywords(Number(limit));
    return c.json({ keywords });
  } catch (error) {
    console.error('Error getting last keywords:', error);
    return c.json({ error: 'Failed to get last keywords' }, 500);
  }
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
