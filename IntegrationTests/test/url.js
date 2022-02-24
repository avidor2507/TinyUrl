import supertest from 'supertest';
import { expect } from 'chai';
import CreateApp from '../../Server/app.js';

const request = supertest(CreateApp());

describe('url', async () => {
    describe('POST', async () => {
        it('green flow', async () => {
            const body = { url: 'https://www.google.co.il/' };
            const res = await request.post('/short').send(body);
            expect(res.status).to.be.eq(200);
            expect(res.body).to.be.not.empty;
            expect(res.body).to.be.a('string').and.satisfy(msg => msg.startsWith('http://localhost:8080/'));
            console.log('1 end');
        });

        it('wrong url format', async () => {
            const body = { url: 'google.co.il' };
            const res = await request.post('/short').send(body);
            expect(res.status).to.be.eq(400);
            expect(res.body).to.be.not.empty;
            expect(res.body).to.be.a('string').and.to.be.eq('Invalid URL');
            console.log('2 end');
        })

        it('empty body', async () => {
            const res = await request.post('/short').send();
            expect(res.status).to.be.eq(400);
            expect(res.body).to.be.not.empty;
            expect(res.body).to.be.a('string').and.to.be.eq('No URL value');
        })
    })
});