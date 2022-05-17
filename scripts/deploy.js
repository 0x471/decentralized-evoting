const hre = require("hardhat");

async function main() {

  const DecentralizedEVoting = await ethers.getContractFactory("DecentralizedEVoting");
  const decentralizedEVoting = await DecentralizedEVoting.deploy(["0x4a61636b00000000000000000000000000000000000000000000000000000000", "0x44616e69656c0000000000000000000000000000000000000000000000000000"]);

  await decentralizedEVoting.deployed();

  console.log("DecentralizedEVoting contract deployed to:", decentralizedEVoting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
