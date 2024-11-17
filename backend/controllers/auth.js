import bcrypt from "bcrypt"
import User from "../models/users.js";
import genTokenAndSetCookie from "../utilities/tokens.js";


export const signup = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender } = req.body;

        if( password ==! confirmPassword) {
            return res.status(400).json({error: "Passwords doesn't match"})
        }

        const user = await User.findOne({userName});

        if(user) {
            return res.status(400).json({error: "Username already exists!"})
        }

        //HASH PASSWORD HERE
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)


        //Random profile picture api
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: passwordHash,
            email,
            gender,
            profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture
        })

        if(newUser) {
            genTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
                profilePicture: newUser.profilePicture
            })
        } else {
            res.status(400).json({error: "Invalid user credentials"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const login = async (req, res) => {
    try {
        const {userName, email, password} = req.body;
        const user = await User.findOne({userName, email})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
          return res.status(400).json({error: "Invalid user credentials"});
        }

        genTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            profilePicture: user.profilePicture
        });
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully!"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        
        res.status(500).json({error: "Internal Server Error"})
    }
};