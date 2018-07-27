import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import db from '../index.js';

// May require additional time for downloading MongoDB binaries


let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });
});

afterAll(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

describe('create user', () => {
  it("should create a new user", async () => {
    const newUser = new db.User();
    // const mockUser = { 
    //   username: 'fakeName', 
    // }
    newUser.username = 'fakeName';
    await newUser.save(newUser);
 
    // const cnt = await User.count();
    const insertedUser = await db.User.findOne({username: 'fakeName'});
    expect(insertedUser.username).toEqual(newUser.username);
  });
});


// describe('test database create account', () => {
//   it('should make an account', async() => {
    
//   })
// })