//can I create a user and save the user
//then I add a game the user
//resave the user
//get the user with games
'use strict';

const supergoose = require('../../supergoose');
const User = require('../../../src/auth/user-schema');
const { Role } = require('../../../src/auth/role-schema');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('User Model', () => {
  describe('findOne', () => {
    it('populates acl', async () => {
      // Arrange
      await new User({
        username: 'michele',
        password: 'helloWorld123',
        role: 'player',
      }).save();
      await new Role({
        role: 'player',
        capabilities: ['player'],
      }).save();

      // Act
      let user = await User.findOne({ username: 'michele' });

      // Assert
      expect(user).toBeDefined();
      expect(user.acl).toBeDefined();
      expect(user.acl.capabilities.toObject()).toEqual([
        'player',
      ]);
    });
  });
});
