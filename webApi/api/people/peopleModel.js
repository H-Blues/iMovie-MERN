import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PeopleSchema = new Schema({
  birthday: { type: String },
  known_for_department: { type: String },
  deathday: { type: String },
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  gender: { type: Number },
  biography: { type: String },
  popularity: { type: Number },
  place_of_birth: { type: String },
  profile_path: { type: String },
  adult: { type: Boolean },
  imdb_id: { type: String },
  homepage: { type: String }
});

PeopleSchema.statics.findByPeopleDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('People', PeopleSchema);