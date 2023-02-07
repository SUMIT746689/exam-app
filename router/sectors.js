import express from "express";
import Sector from "../model/Sectors.js";

const sectorRoute = express.Router();


sectorRoute.get("/", async (req, res, next) => {
  try {

    const responseParent = await Sector.find({ role: "category" })
      .populate({
        path: 'childs',
        populate: {
          path: 'childs',
          populate: {
            path: 'childs'
          }
        }
      });

    // const filterAll = responseParent.filter(role==="category");
    // populate

    res.status(200).json({ responseParent });

  }
  catch (err) {
    res.status(500).json({ err });
  }
});

sectorRoute.post("/", async (req, res, next) => {
  try {

    const response = new Sector({ ...req.body })
    await response.save()

    if (req.body.parent_id) {
      const responseParent = await Sector.findByIdAndUpdate(req.body.parent_id, { $push: { childs: response._id } });
      console.log({ responseParent })
    }
    res.status(200).json({ response });

  }
  catch (err) {
    res.status(500).json({ err });
  }
});


export default sectorRoute;