import supertest from 'supertest'
import { Response } from 'express'
import app from '../src/app'
import { expect } from 'chai'

let accessToken: string
let refreshToken: string

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

const mockUserData = {
  username: 'mockUser',
  user_other: 'testUser',
  mailaddr: 'mockuser@braze.dev',
  mail_other: 'testuser@braze.dev',
  password: 'NotSecure123!',
  pass_incorrect: 'NotSecure321!',
  pass_short: 'NotSec',
  mail_invalid: 'braze.dev'
}

describe('Endpoint /api/users', () => {
  it('should fail on non-matching passwords', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: mockUserData.mailaddr,
        password: mockUserData.password,
        passconf: mockUserData.pass_incorrect
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail when passwords are too short', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: mockUserData.mailaddr,
        password: mockUserData.pass_short,
        passconf: mockUserData.pass_short
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail if the email is invalid', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: mockUserData.mail_invalid,
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail if the email is empty', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: '',
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail if the username is empty', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: '',
        mailaddr: mockUserData.mailaddr,
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should create a user account', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: mockUserData.mailaddr,
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(200)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail when the email already exists', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.user_other,
        mailaddr: mockUserData.mailaddr,
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail when the username already exists', (done) => {
    supertest(app)
      .post('/api/users')
      .send({
        username: mockUserData.username,
        mailaddr: mockUserData.mail_other,
        password: mockUserData.password,
        passconf: mockUserData.password
      })
      .expect(400)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
})

describe('Endpoint /api/sessions', () => {
  it('should fail to create a session with incorrect password', (done) => {
    supertest(app)
      .post('/api/sessions')
      .send({
        username: mockUserData.username,
        password: mockUserData.pass_incorrect
      })
      .expect(401)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should fail to create a session with non-existing user', (done) => {
    supertest(app)
      .post('/api/sessions')
      .send({
        username: mockUserData.user_other,
        password: mockUserData.password
      })
      .expect(401)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should create a session', (done) => {
    supertest(app)
      .post('/api/sessions')
      .send({
        username: mockUserData.username,
        password: mockUserData.password
      })
      .expect(200)
      .end((e, r) => {
        if (e) return done(e)
        accessToken = r.body.accessToken
        refreshToken = r.body.refreshToken
        done()
      })
  })
  it('should fail to list sessions without auth', (done) => {
    supertest(app)
      .get('/api/sessions')
      .expect(403)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
  it('should list user sessions', (done) => {
    supertest(app)
      .get('/api/sessions')
      .auth(accessToken, { type: 'bearer' })
      .set('x-refresh', refreshToken)
      .expect(200)
      .end((e, r) => {
        if (e) done(e)
        done()
      })
  })
})
