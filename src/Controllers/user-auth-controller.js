const test = (req, res, next) => {
    res.json({Message: "Hello World"});
};

exports.test = test;