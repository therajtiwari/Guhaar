
import FactoryArtifact from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";
const FactoryAddress = process.env.FACTORY_ADDRESS
import { ethers, Contract } from 'ethers'

const customHttpProvider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

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