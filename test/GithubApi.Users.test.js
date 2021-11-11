const agent = require('superagent');
const chai = require('chai');
chai.use(require('chai-subset'));

const baseUrl = 'https://api.github.com';

const { expect } = chai;

describe('Query parameters test', () => {

    it('Checking default users number', async() => {
        response = await agent.get(`${baseUrl}/users`)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN);

        expect(response.body.length).to.equal(30);
    });

    it('Checking 10 users', async() => {
        response = await agent.get(`${baseUrl}/users`)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN)
          .query({ per_page: 10 });

        expect(response.body.length).to.equal(10);
    });

    it('Checking 50 users', async() => {
        response = await agent.get(`${baseUrl}/users`)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN)
          .query({ per_page: 50 });

        expect(response.body.length).to.equal(50);
    });
});