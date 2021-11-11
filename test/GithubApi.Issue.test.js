const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');
chai.use(require('chai-subset'));

const { expect } = chai;

describe('Github POST and PATCH request Test', () => {
  let repo;
  let respon;
  let issue;
  it('Checking number of public repositories', async () => {
    const response = await agent.get('https://api.github.com/user')
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.public_repos).to.be.above(0);
    repo = response.body;
  });

  it('Getting a repository', async () => {
    const response = await agent.get(repo.repos_url)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    respon = response.body;
    expect(respon).to.not.equal(undefined);
  });

  it('Creating an issue', async () => {
    const response = await agent.post(`https://api.github.com/repos/${repo.login}/${respon.name}/issues`)
      .send({ title: 'This is an issue' })
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    issue = response.body;
    expect(issue.title).to.equal('This is an issue');
    expect(issue.body).to.equal(null);
  });

  it('Modifying an issue', async () => {
    const response = await agent.patch(`https://api.github.com/repos/${repo.login}/${respon.name}/issues/${issue.number}`)
      .send({ body: 'This is the body of the issue' })
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    expect(response.body.title).to.equal(issue.title);
    expect(response.body.body).to.equal('This is the body of the issue');
  });
});
