const ethers = require('ethers');
const aaveabi =require("./aaveabi.json")


async function connectToMetamask() {
 
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

const aaveContractAddress = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';
const aaveContractABI = aaveabi.abi;


async function depositToAave(tokenAddress, amount) {
  const web3 = new Web3(window.ethereum);


  const aaveContract = new web3.eth.Contract(aaveContractABI, aaveContractAddress);


  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

 
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


connectToMetamask()
  .then(() => {
    const tokenAddress = '0xf9aBBc6E64f3Cb3cb237EbcAB95A252365BBd0D0';
    const amount = '10';

    depositToAave(tokenAddress, amount);
  });
