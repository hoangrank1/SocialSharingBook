import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    ownerPicturePath: String,
    customerId: {
      type: String,
      required: true,
    },
    customerPicturePath: String,
    postId: {
      type: String,
      required: true,
    },
    postPicturePath: String,
    placeToMeet: {
      type: String,
      required: true,
    },
    timeToMeet: {
      type: String,
      required: true,
    },
    phoneContact: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
