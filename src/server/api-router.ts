import express from "express";
import cors from "cors";

const router = express.Router();
router.use(cors());

import testData from "../test-data.json";
import { connectClient } from "./db";

router.get("/contests", async(req, res) => {
  const client=await connectClient();
  client.collection("contests")
  .find()
  .project({
    id:1,
    categoryName:1,
    contestName:1,
    _id:0
  })
  .toArray();
  // get the data from MongoDB
  res.send({ contests: testData });
});

router.get("/contest/:contestId",async(req,res)=>{
  console.log(req.params.contestId);
  const client=await connectClient();
  const contest=await client
  .collection("contests")
  .findOne({id:req.params.contestId});

  res.send({contest})
});

export default router;
