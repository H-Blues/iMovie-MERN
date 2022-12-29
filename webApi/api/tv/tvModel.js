import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TVSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  backdrop_path: { type: String },
  first_air_date: { type: String },
  poster_path: { type: String },
  overview: { type: String },
  release_date: { type: String },
  name: { type: String },
  genres: [{ id: { type: Number }, name: { type: String } }],
  language: { type: String },
  popularity: { type: Number },
  vote_count: { type: Number },
  vote_average: { type: Number },
  production_countries: [{
    iso_3166_1: { type: String },
    name: { type: String }
  }],
  spoken_languages: [{
    english_name: { type: String },
    iso_639_1: { type: String },
    name: { type: String }
  }],
  status: { type: String },
  tagline: { type: String },
  type: { type: String }
});

TVSchema.statics.findByTvDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('TV', TVSchema);


