import { ethers, BrowserProvider } from 'ethers';

export const sendTransaction = async (
  recipient: string,
  amountEth: string
): Promise<{ hash: string }> => {
  if (!window.ethereum) {
    throw new Error("Wallet not found. Please install MetaMask.");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const txResponse = await signer.sendTransaction({
    to: recipient,
    value: ethers.parseEther(amountEth),
  });

  return { hash: txResponse.hash };
};
