import { User, UsersModel } from '../user';

const userModel = new UsersModel();

describe('User Store Model', () => {
  let sample: User;

  const sampleUser: User = {
    firstname: 'admin',
    lastname: 'admin',
    password: 'test',
  };

  beforeAll(async function () {
    try {
      sample = await userModel.create(sampleUser);
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  });

  it('should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('should have an show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(userModel.create).toBeDefined();
  });

  it('should have an login method', () => {
    expect(userModel.login).toBeDefined();
  });

  it('should have an delete method', () => {
    expect(userModel.delete).toBeDefined();
  });

  it('index method shold return a list of users', async () => {
    const result = await userModel.index();
    expect(result[0].firstname === sample.firstname).toBeTruthy();
  });

  it('show method shold return a user', async () => {
    try {
      const result = await userModel.show((sample.id as number).toString());
      expect(result.firstname === sample.firstname).toBeTruthy();
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('login method shold return a user', async () => {
    try {
      const result = await userModel.login(sampleUser.firstname);
      expect(result.firstname === sample.firstname).toBeTruthy();
    } catch (err) {
      throw new Error(`Could not make test. Error: ${err}`);
    }
  });

  it('create method should add a user', () => {
    expect(sampleUser.firstname === sample.firstname).toBeTruthy();
  });
});
