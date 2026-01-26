// sho faidtha
// isAuth/ is login
// const isAuth = (req, res, next) => {
//   if (!req.session.user) {
//     next();
//   } else {
//     res.status(401).send({ message: "LogoutFirst." });
//   }
// };

// hay authorization e3ne ada dsawe add , delete...
const isAuth = (req, res, next) => {
  if (req.session.user) {
    console.log(req.session.user);
    next();
  } else {
    res.status(401).send({ message: "Authorization required." });
  }
};

module.exports =  [isAuth] ;
