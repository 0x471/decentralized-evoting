require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
	networks: {
	 hardhat: {
	 },
	 bscTestnet: {
		 url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
		 accounts: ["0x6ea2ae2a154924b97fa96c9460a98fcef416ba75598bfa7e2653ffd0322ab855"]
	 },
	 localhost: {
		 url: "http://127.0.0.1:8545"
	 }
 },
};
