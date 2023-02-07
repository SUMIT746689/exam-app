export const sessionCheck = (req, res, next) => {
console.log(!!!req.session.user_id && !!!req.body._id)
  if (!req.session.user_id && req.body._id) return res.status(404).json({ "err": "Session Expired" })
  
  else {
    console.log(req.session)
    console.log(req.body)
    next();
  }

}

