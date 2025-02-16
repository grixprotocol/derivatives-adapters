import Zomma from "zomma.js";
import * as dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();

export const getShortOptionPremium = async (
  expiry: number,
  strike: number
): Promise<number> => {
  const zomma = new Zomma({
    privateKey: process.env.PRIVATE_KEY,
    network: "mainnet", // or 'testnet' for the test network
  });
  await zomma.initialize();

  const markets = await zomma.getMarkets();
  const buySize = ethers.parseEther(`0.1`);

  // BTC Buy Call Expiry 2024/9/6 60,000  0.1 size
  const quote = await zomma.getPremium(
    markets[0], //BTC-USDC
    expiry,
    strike,
    true,
    buySize.toString()
  );
  console.log(quote);
  const premium = quote[0];
  const fee = quote[1];

  console.log(ethers.formatEther(premium));
  console.log(ethers.formatEther(fee));

  return premium;
};
