const { MongoClient } = require('mongodb');

const connectionString = "mongodb+srv://fahmi1337:bYZviGnO9wOaLvzs@cluster0.cctlx11.mongodb.net";

let db = null;

const mongoConnect = async () => {
    const client = new MongoClient(connectionString);

    try {
        const database = client.db('mekdi')
        db = database;
        return database;
    } catch (error) {
        await client.close();
    }
}

const getDatabase = () => db;

module.exports = {
    mongoConnect,
    getDatabase
};

