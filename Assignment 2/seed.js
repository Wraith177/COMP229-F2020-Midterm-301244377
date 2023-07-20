const mongoose = require('mongoose');
const Contact = require('./models/contact');

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB is connected");
}).catch(err => {
  console.log("Failed to connect to MongoDB", err);
});

// Function to create boilerplate contacts
const createContacts = async () => {
    try {
      // Check if contacts already exist
      const contactsCount = await Contact.countDocuments();
      if (contactsCount > 0) {
        console.log('Boilerplate contacts already exist. Skipping data creation.');
        return;
      }
  
      // Define the number of contacts to generate
      const numContacts = 50; // Adjust the number as needed
  
      // Generate multiple contacts
      const contacts = [];
      for (let i = 0; i < numContacts; i++) {
        const contact = {
          name: `Contact ${i + 1}`,
          number: `123456789${i}`,
          email: `contact${i + 1}@example.com`
        };
        contacts.push(contact);
      }
  
      // Insert contacts into the database
      await Contact.insertMany(contacts);
      console.log(`Created ${numContacts} boilerplate contacts.`);
    } catch (err) {
      console.error('Error creating boilerplate contacts:', err);
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();
    }
  };
  

// Invoke the function to create contacts
createContacts();
