// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SocialNetwork {
    struct Friend {
        address friendAddress;
        bool exists;
    }

    struct FriendRequest {
        address sender;
        address receiver;
        bool accepted;
    }

    mapping(address => mapping(address => Friend)) private friends;
    mapping(address => uint256) private userFriendsCount;
    mapping(address => FriendRequest[]) private friendRequests;

    event FriendRequestSent(address indexed sender, address indexed receiver);
    event FriendRequestAccepted(address indexed sender, address indexed receiver);
    event FriendRequestRejected(address indexed sender, address indexed receiver);

    function sendFriendRequest(address _receiver) external {
        require(msg.sender != _receiver, "Cannot send request to yourself");
        require(!isFriend(msg.sender, _receiver), "Already friends");

        // Check if a request already exists
        for (uint256 i = 0; i < friendRequests[_receiver].length; i++) {
            if (friendRequests[_receiver][i].sender == msg.sender && friendRequests[_receiver][i].receiver == _receiver) {
                revert("Request already sent");
            }
        }

        friendRequests[_receiver].push(FriendRequest(msg.sender, _receiver, false));
        emit FriendRequestSent(msg.sender, _receiver);
    }

    function acceptFriendRequest(address _sender) external {
        for (uint256 i = 0; i < friendRequests[msg.sender].length; i++) {
            if (friendRequests[msg.sender][i].sender == _sender && friendRequests[msg.sender][i].receiver == msg.sender) {
                friendRequests[msg.sender][i].accepted = true;
                friends[msg.sender][_sender] = Friend(_sender, true);
                friends[_sender][msg.sender] = Friend(msg.sender, true);
                userFriendsCount[msg.sender]++;
                userFriendsCount[_sender]++;
                emit FriendRequestAccepted(_sender, msg.sender);
                return;
            }
        }
        revert("Request not found");
    }

    function rejectFriendRequest(address _sender) external {
        for (uint256 i = 0; i < friendRequests[msg.sender].length; i++) {
            if (friendRequests[msg.sender][i].sender == _sender && friendRequests[msg.sender][i].receiver == msg.sender) {
                delete friendRequests[msg.sender][i];
                emit FriendRequestRejected(_sender, msg.sender);
                return;
            }
        }
        revert("Request not found");
    }

    function getFriendRequests() external view returns (FriendRequest[] memory) {
        return friendRequests[msg.sender];
    }

    function isFriend(address _user, address _friend) public view returns (bool) {
        return friends[_user][_friend].exists;
    }

    function getFriendCount(address user) external view returns (uint256) {
        return userFriendsCount[user];
    }
}
