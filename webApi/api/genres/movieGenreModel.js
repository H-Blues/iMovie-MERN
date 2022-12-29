import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieGenreSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true }
});

export default mongoose.model('MovieGenre', MovieGenreSchema);