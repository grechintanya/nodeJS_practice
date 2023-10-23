import mongoose from 'mongoose';

const DATABASE_URI =
  'mongodb+srv://grechintanya:s4uPPS8Cr1nkcAg7@cluster0.lawdgoc.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
