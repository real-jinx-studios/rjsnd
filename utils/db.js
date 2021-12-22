import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("is connected still from previous connection");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("using previous connection");
      return;
    }
    //if the if is not if means connection is not ready so gotta disconnect it
    await mongoose.disconnect();
  }

  //if we reach this point then it means we never have connected to db so do tha tnow
  const db = await mongoose.connect(
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI
  );
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected but on purpose i guess");
    }
  }
}

//function to handle _id from mongodb because its not normal datatype
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  //also convert doc created at as it is date time obj
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

//in this const we export the function references we want to use in other scripts in one object
const db = { connect, disconnect, convertDocToObj };
export default db;
