const Config = require('../system/config');
Config.port = 3081;

const request = require('supertest');
const expect = require('expect.js');
const App = require('../app');
const app = new App();

const fs = require('fs');
const path = require('path');

const GAME_BASE = Object.freeze({
  name: 'name',
  image: 'image_url',
  region: 'Japan',
  platform: 'platform',
});

const clearTestGameCover = () => {
  const filepath = path.join('./public', 'test-game-cover.jpg');
  const isTestGameCover = fs.existsSync(filepath);
  if (isTestGameCover) fs.unlinkSync(filepath);
}

describe('Server API', () => {
  const endpoint = app.callback();
  let testGameId = undefined;
  let testUpdatedAt = undefined;

  before(clearTestGameCover);
  after(clearTestGameCover);

  it('Create game item', async () => {
    const response = await request(endpoint).post('/api/games/').send(GAME_BASE);
    expect(response.status).to.be.ok();
    const { body } = response;
    expect(body).to.be.a('object').property('name', GAME_BASE.name);
    expect(body).to.be.a('object').property('image', GAME_BASE.image);
    expect(body).to.be.a('object').property('region', GAME_BASE.region);
    expect(body).to.be.a('object').property('platform', GAME_BASE.platform);

    testGameId = body._id.toString();
    testUpdatedAt = body.updatedAt;
  });

  it('Get game item', async () => {
    const response = await request(endpoint).get(`/api/games/${ testGameId }`);
    expect(response.status).to.be.ok();
    const { body } = response;
    expect(body).to.be.a('object').property('name', GAME_BASE.name);
    expect(body).to.be.a('object').property('image', GAME_BASE.image);
    expect(body).to.be.a('object').property('region', GAME_BASE.region);
    expect(body).to.be.a('object').property('platform', GAME_BASE.platform);
  });

  it('Get games list', async () => {
    const response = await request(endpoint).get('/api/games/');
    expect(response.status).to.be.ok();
    const { body: [ item ] } = response;
    expect(item).to.be.a('object').property('name');
    expect(item).to.be.a('object').property('image');
    expect(item).to.be.a('object').property('region');
    expect(item).to.be.a('object').property('platform');
  });

  it('Update game item', async () => {
    const response = await request(endpoint).put(`/api/games/${ testGameId }`).send({ name: 'new_name' });
    expect(response.status).to.be.ok();
    const { body } = response;
    expect(body).to.be.a('object').property('name', `new_${ GAME_BASE.name }`);
    expect(body.updatedAt).not.to.be.eql(testUpdatedAt);
  });

  it('Delete game item', async () => {
    const response = await request(endpoint).delete(`/api/games/${ testGameId }`);

    expect(response.status).to.be.ok();
    expect(response.status).to.be.a('number').eql(204);
  });

  it('Upload image', async () => {
    const response = await request(endpoint).put('/api/upload').attach('image', path.join(__dirname, 'test-game-cover.jpg'));
    expect(response.status).to.be.ok();
    const { body } = response;
    expect(body).to.be.a('object').property('fieldname', 'image');
    expect(body).to.be.a('object').property('originalname', 'test-game-cover.jpg');
    expect(body).to.be.a('object').property('encoding', '7bit');
    expect(body).to.be.a('object').property('mimetype', 'image/jpeg');
    expect(body).to.be.a('object').property('destination', './public');
    expect(body).to.be.a('object').property('filename', 'test-game-cover.jpg');
    expect(body).to.be.a('object').property('path', 'public\\test-game-cover.jpg');
    expect(body).to.be.a('object').property('size', 66043);
  });
});
