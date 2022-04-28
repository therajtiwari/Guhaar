
import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";

export default async (Moralis,id,isWeb3Enabled, isAuthenticated, isWeb3EnableLoading)=>{

    const readOptions = {
        contractAddress: id,
        functionName: "getDetails",
        abi: CampaignArtifact.abi,
      };
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading){
        await Moralis.enableWeb3()
      }
    campaign = await Moralis.executeFunction(readOptions);
    campaign = { ...campaign, id: id }
}