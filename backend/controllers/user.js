import User from "../models/users.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password"); //This is to fetch every user in the database except the loggedIn user!

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSideBar Controller: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}