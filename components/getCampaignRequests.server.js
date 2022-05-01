import CampaignArtifact from "../artifacts/contracts/Campaign.sol/Campaign.json";

export default async (
  Moralis,
  id,
  userAddress,
  isWeb3Enabled,
  isAuthenticating,
  isWeb3EnableLoading
) => {
  const readOptions2 = {
    chain: "rinkeby",
    address: id,
    function_name: "approvers",
    abi: CampaignArtifact.abi,
    params: { "": userAddress },
  };
  var canapprove = await Moralis.Web3API.native.runContractFunction(
    readOptions2
  );
  const readOptions3 = {
    chain: "rinkeby",
    address: id,
    function_name: "alwaysApprovedMap",
    abi: CampaignArtifact.abi,
    params: { "": userAddress },
  };
  canapprove =
    canapprove &&
    !(await Moralis.Web3API.native.runContractFunction(readOptions3));
  console.log("count is", count);
  const readOptions = {
    chain: "rinkeby",
    address: id,
    function_name: "getRequestsCount",
    abi: CampaignArtifact.abi,
  };
  // console.log(readOptions)
  // console.log(isWeb3Enabled, isAuthenticating, isWeb3EnableLoading);
  // if (!isAuthenticating && !isWeb3Enabled && !isWeb3EnableLoading){
  //   await Moralis.enableWeb3()
  let datalist = [];

  const count = await Moralis.Web3API.native.runContractFunction(readOptions);
  console.log("count is", count);
  for (let i = 0; i < count; i++) {
    const readOptions2 = {
      chain: "rinkeby",
      address: id,
      function_name: "requests",
      abi: CampaignArtifact.abi,
      params: { "": "" + i },
    };
    let request = await Moralis.Web3API.native.runContractFunction(
      readOptions2
    );
    const readOptions3 = {
      chain: "rinkeby",
      address: id,
      function_name: "getRequestApproval",
      abi: CampaignArtifact.abi,
      params: {
        "index": i + "",
        "user": userAddress,
      },
    };
    requestapproved = await Moralis.Web3API.native.runContractFunction(
      readOptions3
    );
    console.log("requestapproved: ", requestapproved);
    request = { ...request, index: i };
    datalist.push(request);
  }
  const readOptions4 = {
    chain: "rinkeby",
    address: id,
    function_name: "approversCount",
    abi: CampaignArtifact.abi
  };
  var numberofapprovers = await Moralis.Web3API.native.runContractFunction(readOptions4);

  // return datalist, canapprove
  return { datalist, canapprove, numberofapprovers }
  // }else{
  //   return false
  // }
};
