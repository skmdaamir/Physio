const bcrypt = require('bcryptjs');

const plainPassword = 'admin@123'; // You can change this
const saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(plainPassword, salt, (err, hash) => {
    if (err) throw err;

    console.log("Use this hashed password in your DB:");
    console.log(hash);
  });
});