const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

require('dotenv').config();

describe('Github PUT request Test', () => {
  let repo;
  it('Following aperdomob', async () => {
    const response = await agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .set('accept', 'application/vnd.github.v3+json');

    expect(response.status).to.equal(statusCode.NO_CONTENT);
    expect(response.body).to.eql({});
  });

  it('Getting aperdomob followers', async () => {
    const response = await agent.get('https://api.github.com/user/following')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    repo = response.body.find((element) => element.login === 'aperdomob');
    expect(repo);
  });

  it('re-following aperdomob', async () => {
    const response = await agent.put('https://api.github.com/user/following/aperdomob')
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .set('accept', 'application/vnd.github.v3+json');

    expect(response.status).to.equal(statusCode.NO_CONTENT);
    expect(response.body).to.eql({});
  });
});
