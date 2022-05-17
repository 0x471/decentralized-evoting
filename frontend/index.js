let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

function networkIsBSCTestnet() {

	if(window.ethereum.networkVersion != "97") {
		return false;
	}
	return true;

}

window.addEventListener('load', async () => {

	accounts = await provider.send("eth_requestAccounts", []);
	if(accounts.length == 0) {
		console.log("No account found.")
		alert("No account found, make sure that client is configured properly.")
	}

	if(networkIsBSCTestnet() != true) {
		alert("Please connect to BSC Testnet.")
		return
	}

	console.log("Connected to BSC Testnet.")
	viewCandidates()
	$("#addrText").addClass('text-success').removeClass("text-danger");
	signer = await provider.getSigner();
	addr = await signer.getAddress()
	console.log("Account: "+addr)
	$("#addrText").text("Connected wallet: "+addr);

});

const contractAddr = "0xA93Da959bBBcE93c38C2Bb603a153A8f83f01159"
const ABI = [ { "inputs": [], "name": "endElection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32[]", "name": "_candidateNames", "type": "bytes32[]" } ], "stateMutability": "payable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalTyped": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_id", "type": "uint256" } ], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "candidates", "outputs": [ { "internalType": "uint256", "name": "ID", "type": "uint256" }, { "internalType": "bytes32", "name": "Name", "type": "bytes32" }, { "internalType": "uint256", "name": "Votes", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "hasEnded", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "hasVoted", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "viewCandidates", "outputs": [ { "components": [ { "internalType": "uint256", "name": "ID", "type": "uint256" }, { "internalType": "bytes32", "name": "Name", "type": "bytes32" }, { "internalType": "uint256", "name": "Votes", "type": "uint256" } ], "internalType": "struct DecentralizedEVoting.Candidate[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" } ]
const contract = new ethers.Contract(contractAddr, ABI, provider);


async function viewCandidates() {

	await contract.viewCandidates().then(dataPromise => {
		//console.log(dataPromise)
		dataPromise.forEach(
			function(data) {
				//console.log("data "+data)
				var id = data[0].toNumber()
				var candidate = ethers.utils.parseBytes32String(data[1]);
				var vote = data[2].toNumber().toString();

				$('tbody').after(`<tr><td class="column1">${candidate}</td><td class="column2">${vote}<button onClick="vote(${id})" style="float: right;" class="btn btn-primary">Vote</button></td></tr>`)
			}
		);
	})
	.catch(e => {
		console.log(e)
		alert(e.data.message+" Please check JS console for further details.")
	})

}

async function vote(id) {

	try {

		txResponse = await contract.connect(signer).vote(id)
		response = await txResponse.wait()
		alert("Recieved your vote, thank you.")
	} catch(e) {
		console.log(e)
		alert(e.data.message+" Please check JS console for further details.")

	}

}
