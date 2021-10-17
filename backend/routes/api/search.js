const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth=require("../../middleware/auth")

// @route    GET api/search/:id
// @desc     Get profiles from query 
// @access   Private
router.get("/:id", auth, async (req, res) => {
    try{
        console.log(req.params.id)
        const result = await User.aggregate([
            {
                "$search":{
                    "autocomplete":{
                        "query":req.params.id,
                        "path":"email",
                        "fuzzy":{
                            "maxEdits":2
                        }
                    }
                }  
            },
            {
                "$limit":10
            }
        ])
        console.log(result)
        res.status(200).json(result)
    }catch(err){ 
        console.error(err.message)
        res.status(500).send("server error");

    }
})
module.exports = router

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