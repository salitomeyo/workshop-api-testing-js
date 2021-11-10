const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('Github Api Test', () => {
  it('Checking name', async () => {
    const response = await agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('name');
    expect(response.body.name).equal('Alejandro Perdomo');
  });

  it('Checking company', async () => {
    const response = await agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('company');
    expect(response.body.company).equal('Perficient Latam');
  });

  it('Checking location', async () => {
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
    const response = await agent.get(`https://api.github.com/users/${githubUserName}/repos`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    repo = response.body.find((element) => element.name === 'jasmine-awesome-report');
    expect(repo);
  });

  it('Checking full name', async () => {
    const respon = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(respon.status).to.equal(statusCode.OK);
    expect(respon.body).to.have.property('full_name');
    expect(respon.body.full_name).equal('aperdomob/jasmine-awesome-report');
  });

  it('Checking private', async () => {
    const respon = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(respon.status).to.equal(statusCode.OK);
    expect(respon.body).to.have.property('private');
    expect(respon.body.private).equal(false);
  });

  it('Checking description', async () => {
    const respon = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(respon.status).to.equal(statusCode.OK);
    expect(respon.body).to.have.property('description');
    expect(respon.body.description).equal('An awesome html report for Jasmine');
  });

  it('Getting archive list', async () => {
    const respon = await agent.get(`${repo.url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(respon.status).to.equal(statusCode.OK);
    expect(respon.body).to.have.property('archive_url');
  });
});

describe('Download jasmine-awesome-report', () => {
  it('Getting archive url', async () => {
    const response = await agent.get('https://api.github.com/repos/aperdomob/jasmine-awesome-report')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('archive_url');

    it('Getting archive list', async () => {
      const respon = await agent.get(`${response.archive_url}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');

      expect(respon.status).to.equal(statusCode.OK);
      const repo = respon.body.find((element) => element.name === 'README.md');
      expect(repo);
    });
  });
});
