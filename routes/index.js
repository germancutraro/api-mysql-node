const express = require('express');
const router = express.Router();

const db = require('../libs/db-connection');
// get for user list
router.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users'; // get records
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('users', {result});
  })
});
// render form template
router.get('/new', (req, res) => {
  res.render('new');
});
// render edit form template
router.get('/edit/:id', (req, res) => {
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`; // get the user
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render('edit', {result});
  });
});

router.post('/create', (req, res) => {
  let user = {name: req.body.name, surname: req.body.surname}; // get user data
  let sql = 'INSERT INTO users SET ?'; // pre insert
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.redirect('/api/users'); // go to the user list
  });
});

router.delete('/delete/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`; // get the user for delete him
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('User deleted!');
  });
});

router.put('/edit/:id', (req, res) => {
  let sql = `UPDATE users SET name = ${db.escape(req.body.name)}, surname = ${db.escape(req.body.surname)} WHERE id = ${req.params.id}`; // using db.escape for security | UPDATING
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Updated!');
  });
});

// 404 route
router.get('*', (req, res) => {
  res.status(404).send('Page not found!');
});

module.exports = router;
