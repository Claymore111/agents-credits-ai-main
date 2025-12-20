import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "../db/connect-db.js";
import Client from "../models/clients.js";

// Sample data arrays for random generation
const firstNames = [
  'Ahmed', 'Mohamed', 'Fatima', 'Aicha', 'Youssef', 'Khadija', 'Omar', 'Zineb',
  'Hassan', 'Amina', 'Ali', 'Hafsa', 'Ibrahim', 'Salma', 'Khalid', 'Nadia',
  'Abderrahim', 'Rajae', 'Said', 'Laila', 'Hamid', 'Souad', 'Rachid', 'Widad',
  'Abdellatif', 'Siham', 'Mustapha', 'Karima', 'Driss', 'Btissam', 'Karim', 'Ghita',
  'Abdellah', 'Malika', 'Yassine', 'Sanaa', 'Amine', 'Houda', 'Tarik', 'Samira'
];

const lastNames = [
  'Alami', 'Benali', 'Chakir', 'Dahbi', 'El Idrissi', 'Fassi', 'Guerraoui', 'Hajji',
  'Idrissi', 'Jabbari', 'Kettani', 'Louali', 'Mansouri', 'Naciri', 'Ouali', 'Qadiri',
  'Rachidi', 'Semlali', 'Tazi', 'Uali', 'Vali', 'Wahbi', 'Xamsi', 'Yousfi', 'Ziani',
  'Amrani', 'Berrada', 'Chraibi', 'Drissi', 'El Fassi', 'Filali', 'Ghali', 'Hamdi'
];

const genders = ['Male', 'Female'];

const cities = [
  'Casablanca', 'Rabat', 'Fes', 'Marrakech', 'Agadir', 'Tangier', 'Meknes', 'Oujda',
  'Kenitra', 'Tetouan', 'Safi', 'Mohammedia', 'Khouribga', 'Beni Mellal', 'El Jadida',
  'Taza', 'Nador', 'Settat', 'Larache', 'Ksar El Kebir', 'Sale', 'Berrechid'
];

// Moroccan zip code patterns (5 digits)
const generateZipCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Generate random Moroccan CIN (8 characters - letters and numbers)
const generateCIN = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let cin = '';
  
  // First 2 characters are letters
  for (let i = 0; i < 2; i++) {
    cin += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  
  // Last 6 characters are numbers
  for (let i = 0; i < 6; i++) {
    cin += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  
  return cin;
};

// Generate random phone number (Moroccan format)
const generatePhone = () => {
  const prefixes = ['06', '07'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const numbers = Math.floor(10000000 + Math.random() * 90000000);
  return `${prefix}${numbers}`;
};

// Generate random email
const generateEmail = (firstName, lastName) => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${domain}`;
};

// Generate random password
const generatePassword = () => {
  return "1234567";
};

// Get random item from array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a single user with random data
const generateRandomUser = async () => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const email = generateEmail(firstName, lastName);
  const password = generatePassword();
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone: generatePhone(),
    cin: generateCIN(),
    gender: getRandomItem(genders),
    location: getRandomItem(cities),
    zipCode: generateZipCode(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Main function to create 50 users
const createUsers = async () => {
  try {
    console.log('🚀 Starting user registration script...');
    
    // Connect to database
    await connectDB();
    
    console.log('📝 Generating 50 random users...');
    
    // Generate array of users
    const users = [];
    for (let i = 0; i < 50; i++) {
      const user = await generateRandomUser();
      users.push(user);
      console.log(`Generated user ${i + 1}/50: ${user.firstName} ${user.lastName}`);
    }
    
    console.log('💾 Saving users to database...');
    
    // Insert all users into database
    const savedUsers = await Client.insertMany(users);
    
    console.log(`✅ Successfully created ${savedUsers.length} users!`);
    
    // Display summary
    console.log('\n📊 Summary:');
    console.log(`Total users created: ${savedUsers.length}`);
    console.log(`First user: ${savedUsers[0].firstName} ${savedUsers[0].lastName}`);
    console.log(`Last user: ${savedUsers[savedUsers.length - 1].firstName} ${savedUsers[savedUsers.length - 1].lastName}`);
    //ids of the users
    console.log("ids of the users: ", savedUsers.map(user => user._id));

    
    // Close database connection
    await mongoose.connection.close();
    console.log('🔐 Database connection closed.');
    
  } catch (error) {
    console.error('❌ Error creating users:', error);
    
    // Handle duplicate email errors
    if (error.code === 11000) {
      console.error('Duplicate email detected. Some users may already exist.');
    }
    
    process.exit(1);
  }
};

// Run the script
createUsers();