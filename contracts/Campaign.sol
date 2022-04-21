//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

contract CampaignFactory {
    address[] public deployedCampaigns;
    // address[] public blacklistedaddress;

    function createCampaign(uint minimum,string memory name,string memory description,string memory imageUrl,uint target, string memory category, uint lastdate) public {
        // msg.sender not in blacklistedaddress
        Campaign newCampaign = new Campaign(minimum, msg.sender, name, description, imageUrl, target, category, lastdate);
        deployedCampaigns.push(address(newCampaign));
    }

    // function deleteCampaign() onlyOwner{
    //     Campaign campaign = Campaign(msg.sender);
    //     campaign.delete();
    //     deployedCampaigns.remove(msg.sender);
    // }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}


contract Campaign {
  struct Request {
      string description;
      uint value;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
  }

  Request[] public requests;
  address recipient;
  uint public minimunContribution;
  string public campaignName;
  string public campaignDescription;
  string public imageUrl;
  string public campaignCategory;
  uint256 public campaignLastDate;
  uint public targetToAchieve;
  address[] public contributers;
  mapping(address => bool) public approvers;
  uint public approversCount;

  constructor(uint minimun, address creator,string memory name,string memory description,string memory image,uint target, string memory category, uint lastDate)  {
      recipient = creator;
      minimunContribution = minimun;
      campaignName=name;
      campaignDescription=description;
      imageUrl=image;
      targetToAchieve=target;
      campaignCategory=category;
      campaignLastDate = lastDate;
  }

  function contibute() external payable {
      require(msg.sender!=recipient, "You cannot contribute to your own campaign");
      require(msg.value > minimunContribution, "Contribution is less than the minimum");
      if (!approvers[msg.sender]) {
        contributers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
      }
  }

  function createRequest(string memory description, uint value) public {
      require(msg.sender == recipient, "You can't create a request if you are not the recipient");
      // address(this).balance >= value // can create multiple requests with sum more than balance so no need to check this

      Request storage newRequest = requests.push();
      newRequest.description = description;
      newRequest.value = value;
  }

  function approveRequest(uint index) public {
      require(approvers[msg.sender],"You can't approve a request");
      require(!requests[index].approvals[msg.sender],"You already approved this request");
      require(!requests[index].complete,"Request Already Completed");

      requests[index].approvals[msg.sender] = true;
      requests[index].approvalCount++;
      if (requests[index].approvalCount >= approversCount / 2) {
        finalizeRequest(index);
      }
  }

  function finalizeRequest(uint index) internal{
      require(!requests[index].complete, "Request already finalized");
      uint value = requests[index].value;
      (bool sent, bytes memory data) = recipient.call{value: value}("");
      require(sent, "Failed to send Ether");
      requests[index].complete = true;

  }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }


    function getDetails() public view returns (uint,uint,string memory,string memory,string memory,uint, string memory, uint, uint) {
        return (
            minimunContribution,
            approversCount,
            campaignName,
            campaignDescription,
            imageUrl,
            targetToAchieve,
            campaignCategory,
            campaignLastDate,
            address(this).balance
          );
    }
}