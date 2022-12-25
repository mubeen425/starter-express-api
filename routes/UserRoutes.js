// import express from "express";
const express = require("express");
// import userModel from "../models/userModel";
// import USERS from "../models/userModel";
const USERS = require("../models/userModel");
const Userrouter = express.Router();

// login post
Userrouter.post("/login", async (req, res) => {
  const { username, address, balance } = req.body;
  let ExistingUsers;
  try {
    ExistingUsers = await USERS.findOne({ address });
  } catch (error) {
    return console.log(error);
  }
  let user;
  if (ExistingUsers) {
    // Set the current balance
    ExistingUsers.update({ address: address }, { $set: { balance: balance } });
    return res.status(200).json({ user });
  }
  user = new USERS({
    address,
    balance,
    username,
  });
  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
});
// Upload Images using multer
// const storage = multer.diskStorage({
//   destination : ( req,file,cb)=> {
//     cb(null,'uploadsImages')
//   },
//   filename : (req,file,cb) = > {}
// })
// Update the user 
Userrouter.put('/update',(req,res)=>{

});
// Get Particular User by Address
Userrouter.get("/profile/:address", async (req, res) => {
  const address = req.params.address;
  // console.log(address);
  let user;
  try {
    user = await USERS.findOne({ address: address });
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  if (!user) {
    return res.status(404).json({ message: "Ueer Not found " });
  }
  return res.status(200).json({ user: user });
});

// get all
Userrouter.get("/getAll", async (req, res) => {
  let user;
  try {
    user = await USERS.find();
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  if (!user) {
    return res.status(404).json({ message: "Ueer Not found " });
  }
  return res.status(200).json({ user: user });
});

Userrouter.delete("/deleteAll", async (req, res) => {
  // const address = req.params.address;
  // // console.log(address);
  let user;
  try {
    user = await USERS.deleteMany({});
  } catch (error) {
    return res
      .status(404)
      .json({ error: error, message: "Error in try catch" });
  }
  user = await USERS.find();
  // if (!user) {
  //   return res.status(404).json({ message: "Ueer Not found " });
  // }
  return res.status(200).json({ user: user });
});

module.exports = Userrouter;
