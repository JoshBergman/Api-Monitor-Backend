const { MongoClient, ObjectId } = require("mongodb");
const uri = require('./MONGO_URI');

const client = new MongoClient(uri);
const dbname = 'Users';
const collectionName = 'UserList';

const UserCollection = client.db(dbname).collection(collectionName);


const getAPIList = async (req, res, next) => {
    const sid = req.params.sid;
    const userId = ObjectId(sid);

    try {
        let result = await UserCollection.findOne({ "_id" : userId }, {projection: {"API": 1, _id: 0}});
        res.json({error: false, "API-LIST":result.API});
    }
    catch (err) {
        res.json({error: true});
    }
};

const addOne = async (req, res, next) => {
    const sid = req.params.sid;
    const userId = ObjectId(sid);

    const newAPI = req.body;

    try {
        let result = await UserCollection.updateOne({_id: userId}, {$push: {API: newAPI}});
        res.json({error: false});
    }
    catch (err) {
        res.json({error: true});
    }
};

const deleteOne = async (req, res, next) => {
    const sid = req.params.sid;
    const userId = ObjectId(sid);

    const deleteTitle = req.body.title;

    try {
        let result = await UserCollection.updateOne({_id: userId}, {$pull: {API: {title: deleteTitle}}});
        res.json({error: false});
    }
    catch (err) {
        res.json({error: true});
    }
};

exports.addOne = addOne;
exports.deleteOne = deleteOne;
exports.getAPIList = getAPIList;