
import FactoryArtifact from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";
const FactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
import {ethers, Contract} from 'ethers'

const customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function _intializeContract(wallet, factory = true, campaignaddress = null) {
    let abi
    if (factory) {
        abi = FactoryArtifact.abi
    }
    else {
        abi = CampaignArtifact.abi
    }

    let address

    if (factory) {
        address = FactoryAddress
    }
    else {
        address = campaignaddress
    }

    const contract = new Contract(
      address,
      abi,
      customHttpProvider
    );
  
    return contract
  }

export default _intializeContract