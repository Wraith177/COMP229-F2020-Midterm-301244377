const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB is connected");

  // Define the user schema
  const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
  });

  // Hash the password before saving
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

  // Create the user model
  const User = mongoose.model('User', UserSchema);

  // Create a new user
  const newUser = new User({
    username: 'user1',
    password: 'password', // Plain password
    email: 'example@email.com'
  });

  // Save the new user to the database
  newUser.save().then(() => {
    console.log('User created successfully');
    mongoose.disconnect(); // Disconnect from MongoDB
  }).catch(error => {
    console.error('Error creating user:', error);
    mongoose.disconnect(); // Disconnect from MongoDB
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
