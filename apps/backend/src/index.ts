import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { streamSSE } from 'hono/streaming';
import { getMindMap } from './utils';

const app = new Hono();

app.get('/', (c) => c.text('Hono!'));

app.get('/api/mindMap', async (c) => {
  try {
    const keyword = c.req.query('keyword');

    if (!keyword) {
      return c.json({ error: 'Keyword is required' }, 400);
    }

    return streamSSE(c, async (stream) => {
      try {
        const generator = getMindMap(keyword);

        for await (const chunk of generator) {
          await stream.writeSSE({
            data: chunk,
            event: 'chunk',
          });
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
  } catch (error) {
    console.error('Error in /api/mindMap:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});
