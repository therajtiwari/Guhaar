import FactoryArtifact from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";
const FactoryAddress = process.env.FACTORY_ADDRESS

const INRPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coinstats.app/public/v1/tickers?exchange=WazirX&pair=ETH-INR"
      );
      const value = await response.json();
      return value["tickers"][0]["price"];
    } catch (e) {
      console.log(e);
    }
  };

export default async (Moralis,isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)=>{

    const readOptions = {
        contractAddress: FactoryAddress,
        functionName: "getDeployedCampaigns",
        abi: FactoryArtifact.abi,
    };
    
    let datalist = []
    const price = await INRPrice();
    console.log(isWeb3Enabled, isAuthenticating, isWeb3EnableLoading)
    if (!isAuthenticating && !isWeb3Enabled && !isWeb3EnableLoading){
        await Moralis.enableWeb3()

        var campaignlist = await Moralis.executeFunction(readOptions);
        var campaign

        for(let i=0;i<campaignlist.length;i++){
            let add = campaignlist[i]
            const readOptions = {
                contractAddress: add,
                functionName: "getDetails",
                abi: CampaignArtifact.abi,
              };
            campaign = await Moralis.executeFunction(readOptions);
            campaign = { ...campaign, id: add, price: price }
            datalist.push(campaign)
        }
        return datalist
    }else{
      return []
    }
    
    
}