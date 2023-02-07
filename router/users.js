import express from "express";
import { sessionCheck } from "../controller/users/session.js";
import User from "../model/User.js";

const userRoute = express.Router();

userRoute.get("/", async (req, res, next) => {
  try {
    // console.log({ re})
    if (req.session.user_id) {
      const response = await User.findById(req.session.user_id)

      return res.status(200).json({ response });
    }
    res.status(404).json({ err: "no user founds" });
  }
  catch (err) {
    res.status(500).json({ err });
  }
});


userRoute.post('/', sessionCheck, async (req, res, next) => {
  try {

    const { name, selector_id, agree_of_terms, _id } = req.body;

    if (name && selector_id && agree_of_terms) {

      //if user have id existing
      if (req.session.user_id) {
        const response = await User.findByIdAndUpdate(_id, {
          name,
          selector_id,
          agree_of_terms,
        }, { returnOriginal: false })

        return res.status(200).json({ response: response });
      };

      //new user info stored in database 
      const selectors = new User({
        name,
        agree_of_terms,
        selector_id
      })
      const response = await selectors.save();

      // set session for users
      req.session.authenticated = true;
      req.session.user_id = response._id;
      req.session.save();

      res.status(200).json({ response });
    }
    else res.status(404).json({ err: 'Please fill all required fields' });
  }
  catch (err) {
    res.status(500).json({ err });
  }
});


export default userRoute;