import Story from '../models/story.model.js';

export const createStory = async (request, response) => {
  try {
    const newStory = new Story({
      user: request.user.id,
      storyImage: request.file.path
    });

    const story = await newStory.save();
    response.status(201).send(story);
  } catch (error) {
    response.status(500).send(error,'Server Error');
  }
};

export const getStories = async (request, response) => {
  try {
    const stories = await Story.find().populate('user');
    response.status(200).send(stories);
  } catch (error) {
    response.status(500).send(error,'Server Error');
  }
};
