import * as db from "../db/index.js";

// Submit a comment
export const submit = (user, comment, done) => {
  var data = {
    _id: new Date().toJSON() + ":" + user,
    message: comment,
  };

  db.save(DATABASE, data, function (err, doc) {
    if (err) return done("Unable to connect to CouchDB");
    if (doc.error) return done("Unable to save the comment");
    done(null, doc);
  });
};

// Get all comments
export const all = (done) => {
  db.all(DATABASE, {}, function (err, data) {
    if (err) return done("Unable to connect to CouchDB");
    if (data.error) return done("Unable to get the comments");
    done(null, data.rows);
  });
};

// Get most recent comments
export const recent = (done) => {
  db.all(DATABASE, { limit: 20, descending: true }, function (err, data) {
    if (err) return done("Unable to connect to CouchDB");
    if (data.error) return done("Unable to get the comments");
    done(null, data.rows);
  });
};
