export const sessionCheck = (req, res, next) => {

  if (req.body._id) {
    if (req.session.authenticated) return next();
    res.status(404).json({ "err": "invalid credentials" })
  }
  else {
    console.log(req.session)
    next();
  }

}

