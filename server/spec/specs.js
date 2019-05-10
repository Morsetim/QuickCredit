import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const {expect} = chai;
const request = supertest(app);

describe('All test cases for QuickCredit application', () => {
    describe('test case for loading application home page', () => {
        it('Should load application home page', (done) => {
          request.get('/')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
              expect(res.body).deep.equal({
                message: "Welcome to QuickCredit Loan App"
              });
              if (err) done(err);
              done();
            });
        });
      });
      describe('All test cases for application invalid routes', () => {
        it('Should fail to get route', (done) => {
          request.get('/api/v1')
            .set('Content-Type', 'application/json')
            .expect(404)
            .end((err, res) => {
              expect(res.body).deep.equal({
                status: 'Failed',
                message: 'Page not found'
              });
              if (err) done(err);
              done();
            });
        });
      });
      describe('All test cases for Users', () => {
        it('Should create a new user account and return a `201`', (done) => {
          const userProfile = {
            firstName: 'xanda',
            lastName: 'cage',
            email: 'cage@yahoo.com',
            password: '12345678',
            homeAddress: '55 sango road',
            workAddress: '55 Epic tower'
          };
          request.post('/api/v1/auth/signup')
            .send(userProfile)
            .expect(201)
            .end((err, res) => {
              console.log(res.body);
              expect(res.body.status).to.equal(201);
              expect(res.body.message).to.equal('Successfully created QuickCredit account');
              expect('xanda').to.deep.equal(res.body.data[0].userData.firstName);
              expect(res.body.data[0].userData.lastName).to.equal('cage');
              expect(res.body.data[0].userData.email).to.equal('cage@yahoo.com');
              expect(res.body.data[0].userData.homeAddress).to.equal('55 sango road');
              expect(res.body.data[0].userData.workAddress).to.equal('55 Epic tower');
              if (err) done(err);
              done();
            });
        });
        it('should  check if user already in the model and return a `409`', (done) => {
          const userProfile = {
            firstName: 'xanda',
            lastName: 'cage',
            email: 'cage@yahoo.com',
            password: '12345678',
            homeAddress: '55 sango road',
            workAddress: '55 Epic tower'
          };
          request.post('/api/v1/auth/signup')
            .send(userProfile)
            .expect(409)
            .end((err, res) => {
              expect(res.body.status).to.equal(409);
              expect(res.body.message).to.equal('User already exist');
              done();
            });
        });
        it('should not create a new user account and return a `422`', (done) => {
          request.post('/api/v1/auth/signup')
            .send({})
            .expect(422)
            .end((err, res) => {
              expect(res.body).deep.equal({
                status:'Failed',
                message: 'All or some fields are empty'
              });
              done();
            });
        });
        it('should  not create a new user account and return a `400`', (done) => {
          request.post('/api/v1/auth/signup')
            .send({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              homeAddress: '',
              workAddress: ''
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.catchErrors.firstName).to.equal('First name length must be at least two characters long');
              expect(res.body.catchErrors.lastName).to.equal('Lastname length must be at least two characters long');
              expect(res.body.catchErrors.email).to.equal('Field must be an Email format');
              expect(res.body.catchErrors.password).to.equal('Field cannot be Empty');
              expect(res.body.catchErrors.homeAddress).to.equal('homeAddress length must be at least ten characters long');
              expect(res.body.catchErrors.workAddress).to.equal('workAddress length must be at least ten characters long');
              done();
            });
        });
        it('should  not create a new user account and return a `400`', (done) => {
          request.post('/api/v1/auth/signup')
            .send({
              firstName: 'e1',
              lastName: 'd222',
              email: 'ccc.com',
              password: 'jbh',
              homeAddress: 'oihh//ssnmsmmmm',
              workAddress: 'oihhssn.../msmmmm'
            })
            .expect(400)
            .end((err, res) => {
              // console.log(res.body.catchErrors);
              expect(res.body.catchErrors.firstName).to.equal('Firstname should only be Alphabets');
              expect(res.body.catchErrors.lastName).to.equal('Lastname should only be Alphabets');
              expect(res.body.catchErrors.email).to.equal('Field must be an Email format');
              expect(res.body.catchErrors.password).to.equal('Password length must be at least six characters long');
              expect(res.body.catchErrors.homeAddress).to.equal('Field should be alphabets and numbers');
              expect(res.body.catchErrors.workAddress).to.equal('Field should be alphabets and numbers');
              done();
            });
        });
      });
});