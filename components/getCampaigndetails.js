import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";

export default async (
  Moralis,
  id,
  isWeb3Enabled,
  isAuthenticating,
  isWeb3EnableLoading
) => {
  const readOptions = {
    chain: "rinkeby",
    address: id,
    function_name: "getDetails",
    abi: CampaignArtifact.abi,
  };
  console.log(isWeb3Enabled, isAuthenticating, isWeb3EnableLoading);
  // if (!isAuthenticating && !isWeb3Enabled && !isWeb3EnableLoading){
  //   await Moralis.enableWeb3()
  let campaign = await Moralis.Web3API.native.runContractFunction(readOptions);
  campaign = { ...campaign, id: id };
  return campaign;
  // }else{
  //   return false
  // }
};
