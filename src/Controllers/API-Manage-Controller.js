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
        let result = await UserCollection.findOne({ "_id" : userId }, {"API": 1}); //can't get projection to work
        res.json({"API-LIST":result.API});
    }
    catch (err) {
        res.json({msg: "Error Try Again Later"});
    }
};

const addOne = async (req, res, next) => {
    const sid = req.params.sid;
    const userId = ObjectId(sid);

    const newAPI = req.body;

    try {
        let result = await UserCollection.updateOne({_id: userId}, {$push: {API: newAPI}});
        res.json({modifiedCount: result.modifiedCount});
    }
    catch (err) {
        res.json({added: false});
    }
};

const deleteOne = async (req, res, next) => {
    const sid = req.params.sid;
    const userId = ObjectId(sid);

    const deleteTitle = req.body.title;

    try {
        let result = await UserCollection.updateOne({_id: userId}, {$pull: {API: {title: deleteTitle}}});
        console.log(result);
        res.json({quantityDeleted: result.modifiedCount});
    }
    catch (err) {
        res.json({deleted: false, err: err});
    }
};

exports.addOne = addOne;
exports.deleteOne = deleteOne;
exports.getAPIList = getAPIList;