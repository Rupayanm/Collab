const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
require("dotenv").config();

// @route    GET api/search/:id
// @desc     Get profiles from query
// @access   Private
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const result = await User.aggregate([
//       {
//         $search: {
//           autocomplete: {
//             query: req.params.id,
//             path: "email",
//             fuzzy: {
//               maxEdits: 2,
//             },
//           },
//         },
//       },
//       {
//         $limit: 10,
//       },
//     ]);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send("server error");
//   }
// });

router.post("/posts", async (req, res) => {
  try {
    if (req.body.query === "") {
      return res.status(200).json([]);
    }
    const result = await Post.aggregate([
      {
        $search: {
          index: "searchIndex",
          text: {
            query: req.body.query,
            path: "title",
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

module.exports = router;

// {
//     "mappings": {
//       "dynamic": false,
//       "fields": {
//         "name": [
//           {
//             "foldDiacritics": false,
//             "maxGrams": 7,
//             "minGrams": 3,
//             "tokenization": "edgeGram",
//             "type": "autocomplete"
//           }
//         ]
//       }
//     }
//   }
