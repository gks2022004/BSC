const hre = require("hardhat");
const aaveabi = require("./aaveabi.json");
const erc20abi = require("@openzeppelin/contracts/build/contracts/ERC20.json");
async function main() {
    
  const signer = await hre.ethers.provider.getSigner();

    const aaveLendingPoolAddress = '0x02c3e5420527D75c1c864a58D6a2A73B0EfbfA4D';
    const aaveLendingPoolABI = aaveabi.abi;
    //console.log(aaveabi);

  
    const erc20TokenAddress = '0x99FCee8A75550a027Fdb674c96F2D7DA31C79fcD'; 
    const erc20TokenABI = erc20abi.abi; 
    //console.log(erc20abi);

    // Create contract instances
    const erc20TokenContract = new ethers.Contract(erc20TokenAddress, erc20TokenABI, signer);
    const aaveLendingPoolContract = new hre.ethers.Contract(aaveLendingPoolAddress, aaveLendingPoolABI, signer);

   
    const amountToDeposit = hre.ethers.parseEther("1"); 
    const approveTx = await erc20TokenContract.approve(aaveLendingPoolAddress, amountToDeposit);
    await approveTx.wait();

    console.log("Token approval transaction hash:", approveTx.hash);

   
    const depositTx = await aaveLendingPoolContract.deposit(erc20TokenAddress, amountToDeposit, signer.address, 0);
    await depositTx.wait();

    console.log("Deposit transaction hash:", depositTx.hash);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
