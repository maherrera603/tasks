import {Schema, model} from "mongoose";
import { finished } from "stream";

const taskSchema = new Schema({
    task: {
        type: String,
        required: [true, "Task is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    status: {
        type: Boolean,
        required: [true, "Status is required"]
    },
    finished_task: {
        type: Date,
        required: [true, "Finished task is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        required: [true, "Finished task is required"],
        default: new Date()
    },
    updateAt: {
        type: Date,
        required: [true, "Finished task is required"],
        default: new Date()
    },
});

taskSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
    },
})

export const TaskModel = model("task", taskSchema)