import { ethers } from "ethers";
import AaveLendingPoolABI from "./AaveLendingPoolABI.json";
import ERC20ABI from "./ERC20ABI.json";

// Constants
const AAVE_LENDING_POOL_ADDRESS = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const ERC20_TOKEN_ADDRESS = "0x89C51828427F70D77875C6747759fB17Ba10Ceb0"; 

// Connect to Ethereum 
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);

// Initialize contracts
const lendingPool = new ethers.Contract(
  AAVE_LENDING_POOL_ADDRESS,
  AaveLendingPoolABI,
  provider
);

const erc20Token = new ethers.Contract(
  ERC20_TOKEN_ADDRESS, 
  ERC20ABI,
  provider
);

// Amount to deposit
const depositAmount = ethers.utils.parseEther("1.0"); 

// Approve token transfer
const approveTx = await erc20Token.approve(
  AAVE_LENDING_POOL_ADDRESS, 
  depositAmount
);
await approveTx.wait();

// Call Aave deposit function
const depositTx = await lendingPool.deposit(
  ERC20_TOKEN_ADDRESS, 
  depositAmount,
  "0x0000000000000000000000000000000000000001"
);

await depositTx.wait();

console.log("Deposit successful!");