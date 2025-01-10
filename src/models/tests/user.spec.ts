import { User, UsersModel } from '../user';

const userModel = new UsersModel();

describe('User Store Model', () => {
  let id: number | string = 0;

  let sample: User;

  const sampleUser: User = {
    firstname: 'admin',
    lastname: 'admin',
    password: 'test',
  };

  beforeAll(async function () {
    (id as number) += 1;
    sample = await userModel.create(sampleUser);
    console.log('result :', sample);
  });

  afterAll(function () {
    id = 0;
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
    console.log('result from test :', result);
    expect(result).toEqual([{ id: 1, ...sample }]);
  });

  it('show method shold return a user', async () => {
    const result = await userModel.show(id.toString());

    expect(result).toEqual({
      id: id as number,
      ...sample,
    });
  });

  it('login method shold return a user', async () => {
    const result = await userModel.login(sampleUser.firstname);

    expect(result).toEqual({
      id: id as number,
      ...sample,
    });
  });

  it('create method should add a user', () => {
    expect({
      id: id as number,
      ...sampleUser,
    }).toEqual({
      id: id as number,
      ...sample,
    });
  });
});
