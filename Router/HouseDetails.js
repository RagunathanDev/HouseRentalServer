const express = require("express");
const router = express.Router();

//Schema imported
const HouseDetaiils = require("../models/houseDetails");

//Add house deatisl by owner
router.post("/house/addHouseDetails", async (req, res) => {
  try {
    const newHouseDetails = new HouseDetaiils({
      userId: req.body.userId,
      type: req.body.type,
      price: req.body.price,
      city: req.body.city,
      locality: req.body.locality,
      squareFeet: req.body.squareFeet,
      adminApproval: req.body.adminApproval,
      requestUserDetails: [],
      houseBookedStatus: req.body.houseBookedStatus,
    });

    const responseHouseDetails = await newHouseDetails.save();

    if (responseHouseDetails !== null)
      res.status(200).json({ houseDetails: responseHouseDetails });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ message: error });
  }
});

//fetch house details by owners id
router.post("/house/getDetails", async (req, res) => {
  try {
    const responseHouseDetails = await HouseDetaiils.find({
      userId: Number(req.body.userId),
    });
    res.status(200).json({ houseDetails: responseHouseDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//fetch house details by owners
router.post("/house/getHouseDetails", async (req, res) => {
  try {
    const responseHouseDetails = await HouseDetaiils.find();
    res.status(200).json({ houseDetails: responseHouseDetails });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//remove house detail as owner
router.post("/house/removeHouseDetail", async (req, res) => {
  try {
    const responseHouseDetails = await HouseDetaiils.deleteOne({
      _id: req.body.houseID,
    });

    res.status(200).json({ message: responseHouseDetails.acknowledged });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Approve (or) remove house detail as Admin
router.post("/house/approveHouseDetail", async (req, res) => {
  try {
    const filter = { _id: req.body.houseID };
    const update = { adminApproval: req.body.adminApproval };
    const responseHouseDetails = await HouseDetaiils.findOneAndUpdate(
      filter,
      update
    );

    res
      .status(200)
      .json({ message: responseHouseDetails !== null ? true : false });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

//Booking house by tenanet
router.post("/house/bookingHouse", async (req, res) => {
  try {
    const filter = { _id: req.body.houseID };
    const update = { requestUserDetails: req.body.requestUserDetails };
    const responseHouseDetails = await HouseDetaiils.findOneAndUpdate(
      filter,
      update
    );
    //console.log(responseHouseDetails);
    //console.log(responseHouseDetails !== null && responseHouseDetails.acknowledged);
    res
      .status(200)
      .json({ message: responseHouseDetails !== null ? true : false });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

//Owner Approval Status
router.post("/house/updateHouseRequest", async (req, res) => {
  try {
    const filter = { _id: req.body.houseID };

    const update = {
      requestUserDetails: req.body.house.requestUserDetails,
      houseBookedStatus: req.body.house.houseBookedStatus,
    };
    const responseHouseDetails = await HouseDetaiils.findOneAndUpdate(
      filter,
      update
    );
    //console.log(responseHouseDetails);
    //console.log(responseHouseDetails !== null && responseHouseDetails.acknowledged);
    res
      .status(200)
      .json({ message: responseHouseDetails !== null ? true : false });
  } catch (error) {
    //console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
