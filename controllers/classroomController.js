const db = require('../models');
const fs = require('fs')
// const func = require('./functions');

module.exports = {
  //Find all method is meant to find all classsRooms in the classroom schema
  //My need to add a component to this where we are finding all the classroom for a specific student or teacher
  findAll: function (req, res) {
    db.ClassroomModel
      .find(req.query)
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  //This method is meant to find a specific classroom by Id.  This will be used when wanting to pull up a specific classroom page
  findById: function (req, res) {
    db.ClassroomModel
      .findById(req.params.id)
      .populate({path: 'announcements'})
      // .populate({path:'comments'})
      .exec((error, dbModel) => res.json(dbModel))
  },

  //This will be used to create a classroom.  Goal is for only a user that is a teacher to be able to do this.  Will need user Authentification
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  create: function (req, res) {
    console.log(req.body);

    const newClass = {
      courseTitle: req.body.title,
      courseDiscipline: req.body.discipline,
      courseDescription: req.body.description,
      teacherID: req.body.userID
    }

    db.ClassroomModel
      .create(newClass)
      .then(dbModel => {
        res.json(dbModel)
        console.log('course created');
      })
      .catch(err => res.status(422).json(err));
  },

  //This will update a current classrooms information, assignments, posts, students etc.
  //Certain aspects of this will need user verification because a Teacher will have more ability to change things about classroom
  //Currenlty using req.body and understand that may need to be manipulated more when updating the schema
  update: function (req, res) {
    db.ClassroomModel
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //This will remove the classroom
  //User verfication needed because only a teach can remove a classroom
  remove: function (req, res) {
    db.ClassroomModel
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findImgByClassId: function (req, res) {
    db.ClassroomModel
      .findById(req.params.id, 'image')
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  //This code is specifically for when adding an image to the classroom card.  req.file is created using the multer npm
  //If it is too bulky we can always make a specific route
  //If confused I followed steps in this link: https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed
  //It allows that image to be uploaded to a folder called uploaded.  Then it is saved to the mongo database when delivered as an object in findOneandUpdat     
  updateClassImage: function (req, res) {

    const newData = {
      image: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype
      }
    }

    db.ClassroomModel
      .findOneAndUpdate({ _id: req.params.id }, newData)
      .then(dbModel => {
        console.log('updated')
        //deletes the file from the temporary uploads folder
        fs.unlinkSync(req.file.path)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },

  createAnnouncement: function (req, res) {

    console.log(req.body)
    console.log(req.params.id)

    db.AnnouncementModel.create(req.body)
      .then(dbModel => {

        console.log('announcement created');

        db.ClassroomModel
          .findOneAndUpdate({ _id: req.params.id }, { $push: { announcements: dbModel._id } })
          .populate({ path: 'announcements' })
          .exec((err, updatedClass) => {
            console.log("post update", updatedClass)
            res.json(updatedClass);
          })
      })
      .catch(err => res.status(422).json(err));

  },

  findAnnouncementsByClassId: function (req, res) {
    console.log(req.body);
    console.log(req.params.id)
  },

  createComment: function (req, res) {
    console.log(req.params)
    console.log(req.body)
    console.log(req.body.body)
    console.log(req.body.announcementID)

    db.AnnouncementModel
      .findOneAndUpdate({_id: req.params.id}, {$push: { comments: {body: req.body.body, author: req.body.author}}})
      .then(updateWithComment => {
        console.log(updateWithComment)
      })
      
      // .catch(err => console.log(err))
  }

};