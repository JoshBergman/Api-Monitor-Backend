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
        if(result.deletedCount >= 1){
            res.json({error: false});
        } else {
            throw new Error;
        }
    }
    catch (err) {
        res.json({error: true});
    }
};

const resetAPIList = async (req, res, next) => {
    const sid = ObjectId(req.params.sid);

    try {
        let result = await UserCollection.updateOne({_id: sid}, {$set : {API: []}});
        if(result.modifiedCount >= 1){
            res.json({error: false});
        } else {
            throw new Error;
        }
    }
    catch (err) {
        res.json({error: true});
    }
};

exports.resetAPIList = resetAPIList;
exports.deleteAccount = deleteAccount;