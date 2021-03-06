const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');
chai.use(require('chai-subset'));

const baseUrl = 'https://api.github.com';

const { expect } = chai;

const jsCode = `
function wait(method, time) {
  return new Promise((resolve) => {
    setTimeout(resolve(method()), time);
  });
}
`;

describe('Github DELETE request Test', () => {
  const createGist = {
    description: 'this is an example about promise',
    public: true,
    files: {
      'promise.js': {
        content: jsCode
      }
    }
  };
  let gist;
  let respon;
  it('Creating a gist', async () => {
    const response = await agent.post(`${baseUrl}/gists`)
      .send(createGist)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    gist = response.body;

    expect(gist).to.containSubset(createGist);
    expect(response.status).to.equal(statusCode.CREATED);
  });

  it('Checking gist exists', async () => {
    const response = await agent.get(gist.url)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    expect(response.status).to.equal(statusCode.OK);
  });

  it('Deleting gist', async () => {
    const response = await agent.del(gist.url)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN);

    expect(response.status).to.equal(statusCode.NO_CONTENT);
  });

  it('Checking gist exists', async () => {
    try {
      await agent.get(gist.url)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
    } catch (response) {
      respon = response;
    }

    expect(respon.status).to.equal(statusCode.NOT_FOUND);
  });
});
