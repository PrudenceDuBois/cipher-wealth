import { task } from "hardhat/config";
import { formatEther } from "ethers";

task("accounts", "Prints the list of accounts with balances", async (_taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  console.log("\nAvailable accounts:");
  console.log("==================");
  
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account.address);
    console.log(`${account.address} - Balance: ${formatEther(balance)} ETH`);
  }
  
  console.log("");
});
