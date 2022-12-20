const { MongoClient } = require("mongodb");
const uri = require('./MONGO_URI');

const client = new MongoClient(uri);
const dbname = 'Users';
const collectionName = 'UserList';

const UserCollection = client.db(dbname).collection(collectionName);


const addUser = async (req, res, next) => {
    try {
        let result = await UserCollection.insertOne(req.body);
        res.json({msg:result});
    }
    catch (err) {
        res.json({msg: "Error Try Again Later"});
    }
};

exports.newUser = addUser;