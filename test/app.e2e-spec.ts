import * as request from 'supertest';
import { server } from './setup';

describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    const response = await request(server).get('/').expect(200);

    expect(response.body.data).toBe('Hello World!');
  }, 60000);
});
