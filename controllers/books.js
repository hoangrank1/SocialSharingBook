import Book from "../models/Book.js";

/* CREATE */
export const createBooking = async (req, res) => {
  try {
    const { 
      ownerId, 
      ownerPicturePath,
      customerId, 
      customerPicturePath,
      postId, 
      postPicturePath,
      placeToMeet, 
      timeToMeet, 
      phoneContact,
    } = req.body;
    const newBook = new Book({
      ownerId, 
      ownerPicturePath,
      customerId, 
      customerPicturePath,
      postId, 
      postPicturePath,
      placeToMeet, 
      timeToMeet, 
      phoneContact,
    });
    await newBook.save();
    const book = await Book.find();
    res.status(201).json(book);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const books = await Book.find();
    const updatedBook = books.filter((book) => book.ownerId === ownerId);
    updatedBook.sort((a, b) => (a.createAt > b.createAt) ? 1 : -1);
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getOwner = async (req, res) => {
  try {
    const { customerId } = req.params;
    const books = await Book.find();
    const updatedBook = books.filter((book) => book.customerId === customerId);
    updatedBook.sort((a, b) => (a.createAt > b.createAt) ? 1 : -1);
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};