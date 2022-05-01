//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8;

contract CampaignFactory {
    address[] public deployedCampaigns;

    // address[] public blacklistedaddress;

    function createCampaign(
        uint256 minimum,
        string memory name,
        string memory description,
        string memory imageUrl,
        uint256 target,
        string memory category,
        uint256 lastdate
    ) public {
        // msg.sender not in blacklistedaddress
        Campaign newCampaign = new Campaign(
            minimum,
            msg.sender,
            name,
            description,
            imageUrl,
            target,
            category,
            lastdate
        );
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
        uint256 value;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address recipient;
    uint256 public minimunContribution;
    string public campaignName;
    string public campaignDescription;
    string public imageUrl;
    string public campaignCategory;
    uint256 public campaignLastDate;
    uint256 public targetToAchieve;
    address[] public contributers;
    mapping(address => bool) public contributersMap;
    mapping(address => bool) public approvers;
    uint256 public approversCount;
    uint256 public collectedAmount;
    uint256 public alwaysApproved;
    uint256 public requestedAmount;
    mapping(address => bool) public alwaysApprovedMap;

    constructor(
        uint256 minimun,
        address creator,
        string memory name,
        string memory description,
        string memory image,
        uint256 target,
        string memory category,
        uint256 lastDate
    ) {
        recipient = creator;
        minimunContribution = minimun;
        campaignName = name;
        campaignDescription = description;
        imageUrl = image;
        targetToAchieve = target;
        campaignCategory = category;
        campaignLastDate = lastDate;
    }

    function contibute(bool wantToApprove) external payable {
        require(
            msg.sender != recipient,
            "You cannot contribute to your own campaign"
        );
        collectedAmount += msg.value;
        if (!contributersMap[msg.sender]) {
            contributers.push(msg.sender);
        }
        contributersMap[msg.sender] = true;
        if (!approvers[msg.sender] && msg.value > minimunContribution) {
            approvers[msg.sender] = true;
            approversCount++;
            if (!wantToApprove) {
                alwaysApproved += 1;
                alwaysApprovedMap[msg.sender] = true;
            } else if (alwaysApprovedMap[msg.sender]) {
                alwaysApproved -= 1;
                alwaysApprovedMap[msg.sender] = false;
            }
        }
    }

    function createRequest(string memory description, uint256 value) public {
        require(
            msg.sender == recipient,
            "You can't create a request if you are not the recipient"
        );
        require(
            (address(this).balance - requestedAmount) >= value,
            "You can't create a request of that much amount"
        );
        require(
            block.timestamp > campaignLastDate,
            "Campaign has not ended yet"
        );
        requestedAmount += value;
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        if (approversCount == 0) {
            finalizeRequest(requests.length - 1);
        }
    }

    function approveRequest(uint256 index) public {
        require(approvers[msg.sender], "You can't approve a request");
        require(
            !requests[index].approvals[msg.sender],
            "You already approved this request"
        );
        require(!requests[index].complete, "Request Already Completed");

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
        if (
            requests[index].approvalCount + alwaysApproved >= approversCount / 2
        ) {
            finalizeRequest(index);
        }
    }

    function finalizeRequest(uint256 index) internal {
        require(!requests[index].complete, "Request already finalized");
        uint256 value = requests[index].value;
        (bool sent, bytes memory data) = recipient.call{value: value}("");
        require(sent, "Failed to send Ether");
        requests[index].complete = true;
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }

    function getRequestApproval(uint256 index, address user) public view returns (bool) {
        return requests[index].approvals[user];
    }

    function getDetails()
        public
        view
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            minimunContribution,
            approversCount,
            campaignName,
            campaignDescription,
            imageUrl,
            targetToAchieve,
            campaignCategory,
            campaignLastDate,
            collectedAmount,
            contributers.length,
            recipient
        );
    }
}
