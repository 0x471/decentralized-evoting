ethers = require('ethers');

const candidates = ["Jack", "Daniel"]
// 0x4a61636b00000000000000000000000000000000000000000000000000000000
// 0x44616e69656c0000000000000000000000000000000000000000000000000000

for (let i = 0; i < candidates.length; i++) {
	console.log( ethers.utils.formatBytes32String(candidates[i]))
}
