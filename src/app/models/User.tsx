import { models, model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: {
            type: String,
            required: true,
            unique: true,
            validate: (pass: string | any[]) => {
                if (!pass?.length || pass.length < 5) {
                    new Error("password must be 5 character");
                    return false;
                }
            },
        },
    },
    { timestamps: true }
);

const User = models?.User || model("User", userSchema);
export default User;
