import FriendRequest from "../models/FriendRequest";
import User from "../models/User";

export async function getRecommendedUsers(req,res)  {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                { _id : {$ne : currentUserId}} , // exclude current user
                {$id : {$nin : currentUser.friends}} , // exclude current user's friends
                {isOnboarded : true}, 
            ],
        })
        res.status(200).json(recommendedUsers);

    } catch (error) {
        console.error("Error in getRecommendedUsers controller" , error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");

         res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}

export async function sendFriendRequest(req,res) {
    try {
        const myId = req.user.id;
        const { id : recipientId} = req.params;

        //prevent sending req to yourself
        if(myId === recipientId){
            return res.status(400).json({message : "You can't send friend request to yoruself"});
        }

        const recipient = await User.findById(recipientId)
        if(!recipient) {
            return res.status(404).json({message : "Recipient not found"});
        }

        // check if user is already friends
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({message : "You are already friend with the user"});
        }

        // check if a req already exist
        const existingRequest = await FriendRequest.findOne({
            $or : [
                { sender : myId , recipient : recipientId},
                { sender : recipientId , recipient : myId},
            ],
        });

        if(existingRequest) {
            return res
            .status(400)
            .json({message : "A friend request alreadt exists between you and this user"});
        }

        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId,
        });

        res.status(201).json({friendRequest})



    } catch (error) {
        console.error("Error in sendFriendRequest controller" , error.message);
        res.status(500).json({message : "Internal Server Error"});
    }
}