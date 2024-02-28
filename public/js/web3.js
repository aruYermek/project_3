// Импортируем библиотеку веб3.js
const Web3 = require('web3');


const web3 = new Web3('http://localhost:8545'); 


const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'; 
const userAddress = '0x956Ff8CC532217beeeDD6B970663615a34b0b4dB';


const abi = [
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "FriendRequestAccepted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "FriendRequestRejected",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "FriendRequestSent",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          }
        ],
        "name": "acceptFriendRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getFriendCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getFriendRequests",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "accepted",
                "type": "bool"
              }
            ],
            "internalType": "struct SocialNetwork.FriendRequest[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_friend",
            "type": "address"
          }
        ],
        "name": "isFriend",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_sender",
            "type": "address"
          }
        ],
        "name": "rejectFriendRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_receiver",
            "type": "address"
          }
        ],
        "name": "sendFriendRequest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];


const contractInstance = new web3.eth.Contract(abi, contractAddress);


async function addFriendRequest(receiverAddress) {
  try {
   
    const result = await contractInstance.methods.sendFriendRequest(receiverAddress).send({ from: userAddress });

    
    console.log('Friend request sent successfully:', result);
  } catch (error) {
    
    console.error('Error sending friend request:', error);
  }
}
