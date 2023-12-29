const ethers = require('ethers');

// Step 1: Connect to Metamask
async function connectToMetamask() {
  // Modern dapp browsers
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected to Metamask');
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  } else {
    console.error('Metamask not detected');
  }
}

// Step 2: Set up Aave smart contract address and ABI
const aaveContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const aaveContractABI = [{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]; // Replace with the actual ABI

// Step 3: Interact with Aave's smart contract
async function depositToAave(tokenAddress, amount) {
  const web3 = new Web3(window.ethereum);

  // Create a contract instance
  const aaveContract = new web3.eth.Contract(aaveContractABI, aaveContractAddress);

  // Get the current account address
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

  // Execute the deposit method
  try {
    const tx = await aaveContract.methods.deposit(tokenAddress, amount).send({
      from: userAddress,
    });

    console.log('Transaction hash:', tx.transactionHash);
    console.log('Deposit successful!');
  } catch (error) {
    console.error('Error depositing to Aave:', error);
  }
}

// Usage
connectToMetamask()
  .then(() => {
    const tokenAddress = '0xf9aBBc6E64f3Cb3cb237EbcAB95A252365BBd0D0';
    const amount = '10'; // 1 token in wei

    depositToAave(tokenAddress, amount);
  });
