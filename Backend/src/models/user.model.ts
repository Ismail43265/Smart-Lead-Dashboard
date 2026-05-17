import mongoose, {Document , Schema} from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
    name : string;
    email : string;
    password :string;
    role: UserRole;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name:{
            type: String,
            require: [true, "Name is required"],
            trim :true
        },

        email: {
            type: String,
            require: [true, "Nmae is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            require: [true, "Password is required"],
            minLength: 6,
            select: false
        },

        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return;
    }

    const salt= await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword =async function(
    candidatePassword: string
): Promise<boolean>{
    return bcrypt.compare(candidatePassword, this.password);
};

export const User=mongoose.model<IUser>("User", userSchema);