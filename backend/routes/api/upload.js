const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const config = require("config");
const auth=require("../../middleware/auth")
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const conn = mongoose.connection;

// Init gfs
let gfs;
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
// Create storage engine
const storage = new GridFsStorage({
    url: config.get("mongoURI"),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

// @route POST /upload
// @desc  Uploads file to DB
router.post('/profilePic', auth,upload.single('file'), async (req, res,) => {
  try{
  await  User.findByIdAndUpdate(req.user.id,{$set :{"images.fileName":req.file.filename,"images.imageId":req.file.id}})
    res.status(200).json({ file: req.file })}catch(err){
      console.error(err.message)
      return res.status(500).send("server-error")
    };
    // res.redirect('/');
  });

// @route POST /upload
// @desc  Uploads file to DB
router.post('/postPic/:id', auth,upload.single('file'), async (req, res,) => {
  try{
  const img = {
    "fileName" : req.file.filename,
    "imageId":req.file.id
  }
  let x = await  Post.findByIdAndUpdate(req.params.id,{$push :{images:img}})
  res.status(200).json({ file: req.file });}
  catch(err){
    console.error(err.message)
    return res.status(500).send("Server Error");

  }
  });

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename',auth, async(req, res) => {
  try{  
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
}catch(err){
  console.error(err.message)
  res.status(500).send("server-error")
}});
// @route DELETE /files/:id
// @desc  Delete file
router.delete('/deleteProfilePic/:id',auth ,  async(req, res) => {
    try{
      gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      // res.redirect('/');
    }
    )
    await User.findByIdAndUpdate(req.user.id,{$unset:{images:""}})
    res.status(200).send("ok")
  }catch(err){
      console.error(err.message)
      res.status(500).send("server-error")
    }});

router.delete('/deletePostPic/:id&:postid',auth ,  async(req, res) => {
  try{
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
        }    // res.redirect('/');
      }
    )
    console.log(req.params.postid)
    let post = await Post.findById(req.params.postid).select("images")
    let newpost = post.images.filter(id=>{return id.imageId.toString()!==req.params.id.toString()} )
    post = await Post.findByIdAndUpdate(req.params.postid,{$set:{images:newpost}},{ new: true,  setDefaultsOnInsert: true }
      ).select("images")
    res.status(200).json(post)
    }catch(err){
        console.error(err.message)
        res.status(500).send("server-error")
      }});
module.exports = router 