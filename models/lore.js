import { Schema, model, models } from "mongoose";

const LoreSchema = new Schema({
  creator: {
    type: {
      id: String,
      name: String,
      image: String,
      email: String,
    },
  },
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  content: {
    type: String,
    required: [true, "Content is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

const Lore = models.Lore || model("Lore", LoreSchema);

export default Lore;
