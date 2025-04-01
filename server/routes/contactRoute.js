const express = require('express');
const {
  addContact,
  getAllContacts,
  deleteContactById,
  deleteAllContacts,
  addTouchContact
} = require('../controller/contactController');
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.post('/add', addContact);
router.post('/get-touch', addTouchContact);
router.get('/all', getAllContacts);
router.delete('/delete/:id', deleteContactById);
router.delete('/delete-all', deleteAllContacts);

module.exports = router;
