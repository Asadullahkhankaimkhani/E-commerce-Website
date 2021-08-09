const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  //console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    // console.log(firebaseUser);
    req.user = firebaseUser;
  } catch (err) {
    res.status(401).json({
      err: "Invalid Or Expired Token",
    });
  }
  next();
};
