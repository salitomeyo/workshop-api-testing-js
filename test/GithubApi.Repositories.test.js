const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('Github Api Test', () => {
  it('Checking name', async () => {
    // https://api.github.com/users/aperdomob
    const response = await agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('name');
    expect(response.body.name).equal('Alejandro Perdomo');
  });

  it('Checking company', async () => {
    // https://api.github.com/users/aperdomob
    const response = await agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('company');
    expect(response.body.company).equal('Perficient Latam');
  });

  it('Checking location', async () => {
    // https://api.github.com/users/aperdomob
    const response = await agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('location');
    expect(response.body.location).equal('Colombia');
  });
});

describe('Repo jasmine-awesome-report', () => {
  let repo;
  it('finding repo url', async () => {
    // https://api.github.com/users/aperdomob/repos
    const response = await agent.get(`https://api.github.com/users/${githubUserName}/repos`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    repo = response.body.find((element) => element.name === 'jasmine-awesome-report');
    expect(repo);
  });

  it('Checking full name', async () => {
    // https://api.github.com/repos/aperdomob/jasmine-awesome-report
    const response = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('full_name');
    expect(response.body.full_name).equal('aperdomob/jasmine-awesome-report');
  });

  it('Checking private', async () => {
    // https://api.github.com/repos/aperdomob/jasmine-awesome-report
    const response = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('private');
    expect(response.body.private).equal(false);
  });

  it('Checking description', async () => {
    // https://api.github.com/repos/aperdomob/jasmine-awesome-report
    const response = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('description');
    expect(response.body.description).equal('An awesome html report for Jasmine');
  });

  it('Getting archive list', async () => {
    // https://api.github.com/repos/aperdomob/jasmine-awesome-report
    const response = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('contents_url');
  });
});

describe('README.md file comprobations', () => {
  let repo;
  it('Getting README.md', async () => {
    const response = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report/contents')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    repo = response.body.find((element) => element.name === 'README.md');
    expect(repo);
  });

  it('checking README.md name, path, sha with chaiSubset', async () => {
    // https://api.github.com/repos/aperdomob/jasmine-awesome-report/contents/README.md?ref=master
    const response = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('path');
    expect(response.body).to.have.property('sha');
    expect(response.body).to.containSubset({ name: 'README.md', path: 'README.md', sha: '1eb7c4c6f8746fcb3d8767eca780d4f6c393c484' });
  });
});
