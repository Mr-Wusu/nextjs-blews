import mongoose from 'mongoose';

let isConnected = false // track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try 
  {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "nextjs-blews",
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('=> using new database connection');
  } catch (error) {
    console.log('=> error connecting to database:', error);
  }
}