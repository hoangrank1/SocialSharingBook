import User from "../models/User.js";
import Place from "../models/Place.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  } 
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const places = await Place.find();
    const placeToMeets = places.filter((place) => place.userId === id);
    res.status(200).json(placeToMeets);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }
    await user.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFollowers = async (req, res) => {
  try {
    const { personId, followerId } = req.params;
    const person = await User.findById(personId);

    if (person.followers.includes(followerId)) {
      person.followers = person.followers.filter((id) => id !== followerId);
    } else {
      person.followers.push(followerId);
    }
    await person.save();

    const foLLowers = await Promise.all(
      person.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = foLLowers.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveImpressions = async (req, res) => {
  try {
    const { personId } = req.params;
    const { impressions } = req.body;
    const person = await User.findById(personId);
    
    person.impressions = person.impressions + Number(impressions);
    const updatedUser = await User.findByIdAndUpdate(
      personId,
      { impressions: person.impressions },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveViewedProfile = async (req, res) => {
  try {
    const { personId } = req.params;
    const person = await User.findById(personId);
    
    person.viewedProfile = person.viewedProfile + 1;
    const updatedUser = await User.findByIdAndUpdate(
      personId,
      { viewedProfile: person.viewedProfile },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
