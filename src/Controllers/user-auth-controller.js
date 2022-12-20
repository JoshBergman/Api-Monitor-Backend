const { MongoClient, ObjectId } = require("mongodb");
const uri = require('./MONGO_URI');

const client = new MongoClient(uri);
const dbname = 'Users';
const collectionName = 'UserList';

const UserCollection = client.db(dbname).collection(collectionName);


const login = async (req, res, next) => {
    const rawString = req.params.loginString;

    const marker = rawString.indexOf("^");
    const userEmail = rawString.slice(0, marker);
    const userPassword = rawString.slice(marker + 1, rawString.length);

    try {
        //get and parse document based on email
        let loginResponse = await UserCollection.findOne({ email: userEmail });
        const storedPassword = loginResponse.password;
        const storedId = loginResponse._id;
        const currApiList = loginResponse.API;

        //return sid if passwords match
        if (storedPassword === userPassword){
            res.json({error: false, sid: storedId, APILIST: currApiList});
            return;
        } else {
            res.json({error: true});
            return;
        }
    }
    catch (err) {
        res.json({error: true});
        return;
    }
};

const updatePassword = async (req, res, next) => {
    const sid = ObjectId(req.params.sid);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        const currPassword = await UserCollection.findOne({_id: sid}, {projection: {password: 1, _id: 0}});
        //stored as { password: "password" }

        if (currPassword.password === oldPassword) {
            const response = await UserCollection.updateOne({_id: sid}, {$set: {password: newPassword}});
            if (response.modifiedCount >= 1) {
                res.json({error: false, msg: "Successfully updated password."});
            } else {
                res.json({error: true, msg: "Server failed to update password."});
            }
        } else {
            res.json({error: true, msg: "Current password does not match."});
        }

    } catch (err) {
        res.json({error: true, msg: "Server Error"});
    }
};

exports.login = login;
exports.updatePassword = updatePassword;