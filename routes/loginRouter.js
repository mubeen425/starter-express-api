// import express from "express";
const express = require("express");
// import userModel from "../models/userModel";
// import USERS from "../models/userModel";
const USERS = require("../models/userModel");
const router = express.Router();
router.post("/login", async (req, res) => {
  const { address, balance } = req.body;
  let ExistingUsers;
  try {
    ExistingUsers = await USERS.findOne({ address });
  } catch (error) {
    return console.log(error);
  }
  if (ExistingUsers)
    // Set the current balance
    ExistingUsers.update({ address: address }, { $set: { balance: balance } });
  const user = new USERS({
    address,
    balance,
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
});

module.exports = router;
