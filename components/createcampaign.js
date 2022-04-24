
import FactoryArtifact from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";
const FactoryAddress = process.env.FACTORY_ADDRESS

// import {ethers} from 'ethers'

// // import {useWeb3ExecuteFunction} from "react-moralis"
// const customHttpProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

export default function createCampaign(args) {
    let options = {
        contractAddress: FactoryAddress,
        functionName: "createCampaign",
        abi: FactoryArtifact.abi,
        functionArgs: args,
        network: "devnet",

        //   msgValue: Moralis.Units.ETH(0.1),
    }
    return options

    // const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction(options);
    // fetch()
    // return { data, error, isFetching, isLoading }

}

  