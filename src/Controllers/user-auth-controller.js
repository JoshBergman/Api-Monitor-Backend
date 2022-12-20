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
            res.json({loggedIn: true, sid: storedId, APILIST: currApiList});
            return;
        } else {
            res.json({loggedIn: false});
            return;
        }
    }
    catch (err) {
        res.json({msg: "Server error Try Again Later", loggedIn: false});
        return;
    }
};

exports.login = login;