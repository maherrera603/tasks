import { Schema, model } from "mongoose"

const userSchema = new Schema({

    name: {
        type: String,
        required : [true, 'Name is required']
    },
    last_name: {
        type: String,
        required: [ true,  "Last Name is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    email: {
        type: String,
        required: [ true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: [String],
        default: "USER_ROLE",
        enum: ["ADMIN_ROLE", "USER_ROLE"],
    }
});

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: true,
    transform: function(doc, ret, options) {
        delete ret._id;
        delete ret.password;
    },
});

export const UserModel = model("User", userSchema);