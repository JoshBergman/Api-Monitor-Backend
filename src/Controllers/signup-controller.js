const { MongoClient } = require("mongodb");
const uri = require('./MONGO_URI');

const client = new MongoClient(uri);
const dbname = 'Users';
const collectionName = 'UserList';

const UserCollection = client.db(dbname).collection(collectionName);


const addUser = async (req, res, next) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        API: []
    };

    for (let prop in newUser){
        if(prop === null || undefined){
            res.json({error: true, msg: "Invalid Input"});
        }
    }

    try {
        let result = await UserCollection.insertOne(newUser);
        res.json({error: false, sid: result.insertedId});
    }
    catch (err) {
        res.json({error: true});
    }
};

exports.newUser = addUser;