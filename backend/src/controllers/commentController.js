import Comment from "../models/Comment.js";

import Activity from "../models/Activity.js";

export const createComment = async (
  req,
  res
) => {
  try {
    const { text, taskId } = req.body;

    const comment =
      await Comment.create({
        text,
        task: taskId,
        user: req.user._id,
      });

    await Activity.create({
      task: taskId,
      user: req.user._id,
      action: "Added a comment",
    });

    const populatedComment =
      await Comment.findById(
        comment._id
      ).populate("user");

    res.status(201).json(
      populatedComment
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComments = async (
  req,
  res
) => {
  try {
    const comments =
      await Comment.find({
        task: req.params.taskId,
      })
        .populate("user")
        .sort({
          createdAt: -1,
        });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};