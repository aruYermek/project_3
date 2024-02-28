const { ethers } = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  console.log("Deploying MyToken...");
  const myToken = await MyToken.deploy();
  await myToken.waitForDeployment();
  console.log("MyToken deployed at:", myToken.target);

  const SocialNetwork = await ethers.getContractFactory("SocialNetwork");
  console.log("Deploying SocialNetwork...");
  const socialNetwork = await SocialNetwork.deploy();
  await socialNetwork.waitForDeployment();
  console.log("SocialNetwork deployed at:", socialNetwork.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
