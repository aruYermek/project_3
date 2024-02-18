async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  try {
    const SocialNetwork = await ethers.getContractFactory("SocialNetwork");
    const contract = await SocialNetwork.deploy();
  
    // Wait for the contract to be deployed
    await contract.waitForDeployment();
  
    console.log("Contract deployed to address:", contract.target);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error running script:", error);
    process.exit(1);
  });
