const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');
chai.use(require('chai-subset'));

const baseUrl = 'https://github.com';

const { expect } = chai;

describe('Github HEAD request Test', () => {
  let respon;
  it('Checking page with HEAD', async () => {
    try {
      await agent.head(`${baseUrl}/aperdomob/redirect-test`);
    } catch (response) {
      respon = response;
    }

    expect(respon.status).to.equal(statusCode.MOVED_PERMANENTLY);
    expect(respon.response.headers.location).to.equal(`${baseUrl}/aperdomob/new-redirect-test`);
  });

  it('Checking page with GET', async () => {
    const response = await agent.get(`${baseUrl}/aperdomob/redirect-test`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    expect(response.status).to.equal(statusCode.OK);
  });
});
