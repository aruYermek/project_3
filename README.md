# Final Project
Final project will be a decentralized professional networking
platform using the Ethereum blockchain and Solidity smart
contracts. The platform will allow users to create profiles,
connect with other professionals, and showcase their skills and
experiences. The primary goal is to create a web3 Linkedln-like
application where users have control over their data, and
interactions are secured by smart contracts.

# Assigment 1
1.Registration/Login using MongoDB
2. Connect Wallet page

We created Registraition/Login page and access to Metomask wallet and connect it

# Assigment 2
1.Solidity contract
2.main page/profile page

We created Registraition/Login page and access to Metomask wallet and connect it

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/registration-login-app.git
   
2. Navigate to the project directory:

   ```bash
   cd registration-login-app
   
3. Install dependencies:

   ```bash
   npm install


### Configuration
1. Create a .env file in the project root and add the following configurations:
   ```bash
   PORT=5500
   MONGO_URL = mongodb+srv://gulim:gulim212386@main.4o7rqo1.mongodb.net/my_db?retryWrites=true&w=majority
Adjust the **PORT** and **MONGODB_URI** as needed.

### Running the application
1. Start the MongoDB server.
2. Run the application:
   ```bash
   npm run server
The server will be running at http://localhost:5500

### Usage
1. Open your web browser and go to http://localhost:5500
2. Follow the on-screen instructions to register or login.
3. After correct register/login, you can connect your wallet

### API Endpoints
* **POST /register**: Register a new user.
* **POST /login**: Login with an existing user.
* **GET /users**: Get a list of all registered users.
* **DELETE /users/delete**: Delete all registered users.

### Built with
- Node.js
- Express
- MongoDB
- bcrypt
- Solidity
- Web3


### License
No license :D

Contact us
221819@astanait.edu.kz(Gulimzhan Orynbassar)
220612@astanait.edu.kz(Yermek Aruzhan)
221935@astana.edu.kz(Dilnaza Baidakhanova)
