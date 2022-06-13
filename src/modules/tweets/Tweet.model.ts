import mongoose, { Schema, Document } from 'mongoose';

export interface ITweet {
  _id?: any;
  description?: string;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITweetDocument extends Document {
  author: string;
  description: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const TweetModel = new Schema<ITweetDocument>(
  {
    author: String,
    description: String,
    likes: {
      type: Number,
      default: 0,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      required: false
    },
  },
  {
    timestamps: {},
  },
);

const model = mongoose.model('Tweet', TweetModel);

export default model;