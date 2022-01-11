import supertest from 'supertest'
import assert from 'assert'
import app from '../src/app'

describe('Swagger Docs', () => {
    it('should return a 200 status code (UI)', (done) => {
        supertest(app).get('/docs/')
        .expect(200)
        .end((e, r) => {
            if (e) done(e)
            done()
        })
    })
    it('should return a 200 status code (JSON)', (done) => {
        supertest(app).get('/docsjson')
        .expect(200)
        .end((e, r) => {
            if (e) done(e)
            done()
        })
    })
})

describe('Healthcheck', () => {
    it('should return a 200 status code', (done) => {
        supertest(app).get('/api/health')
        .expect(200)
        .end((e, r) => {
            if (e) done(e)
            done()
        })
    })
})