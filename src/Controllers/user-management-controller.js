const { MongoClient, ObjectId } = require("mongodb");
const uri = require('./MONGO_URI');

const client = new MongoClient(uri);
const dbname = 'Users';
const collectionName = 'UserList';

const UserCollection = client.db(dbname).collection(collectionName);


const deleteAccount = async (req, res, next) => {
    const sid = ObjectId(req.params.sid);

    try {
        let result = await UserCollection.deleteOne({_id: sid});
        res.json({msg:result});
    }
    catch (err) {
        res.json({msg: "Error Try Again Later"});
    }
};

const resetAPIList = async (req, res, next) => {
    const sid = ObjectId(req.params.sid);

    try {
        let result = await UserCollection.updateOne({_id: sid}, {$set : {API: []}});
        res.json({msg:result, deleted: true});
    }
    catch (err) {
        res.json({deleted: false, msg: "Error Try Again Later"});
    }
};

exports.resetAPIList = resetAPIList;
exports.deleteAccount = deleteAccount;