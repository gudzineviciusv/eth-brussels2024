// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountManager {
    address public admin;
    address public administratorAccount;
    address[] public addressList;
    mapping(address => bool) public whiteList;
    mapping(address => bool) public blackList;
    mapping(address => string) public messages;

    uint256 public distributionStartTime;
    uint256 public constant CLAIM_PERIOD = 3 days;
    mapping(address => bool) public hasClaimed;
    uint256 public totalClaimed;

    event AccountCreated(address indexed account);
    event WhiteListed(address indexed account, string message);
    event BlackListed(address indexed account, string message);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);
    event AdministratorChanged(address indexed oldAdmin, address indexed newAdmin);
    event FundsDistributed(uint256 totalAmount, uint256 perWalletAmount, uint256 numberOfWallets);
    event MessageUpdated(address indexed account, string message);
    event Claimed(address indexed account, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier notBlackListed() {
        require(!blackList[msg.sender], "Blacklisted accounts cannot perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createAccount() external onlyAdmin {
        emit AccountCreated(msg.sender);
    }

    function addToWhiteList(address _account, string calldata _message) external onlyAdmin {
        whiteList[_account] = true;
        messages[_account] = _message;
        emit WhiteListed(_account, _message);
    }

    function addToBlackList(address _account, string calldata _message) external onlyAdmin {
        blackList[_account] = true;
        messages[_account] = _message;
        emit BlackListed(_account, _message);
    }

    function setAdministratorAccount(address _account) external onlyAdmin {
        address oldAdmin = administratorAccount;
        administratorAccount = _account;
        emit AdministratorChanged(oldAdmin, _account);
    }

    function changeAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "New admin address cannot be zero");
        address oldAdmin = admin;
        admin = _newAdmin;
        emit AdminChanged(oldAdmin, _newAdmin);
    }

    function reportDeath() external onlyAdmin {
        uint256 totalAmount = address(this).balance;
        require(totalAmount > 0, "No funds to distribute");

        uint256 whiteListCount = 0;
        for (uint256 i = 0; i < addressList.length; i++) {
            if (whiteList[addressList[i]]) {
                whiteListCount++;
            }
        }
        
        require(whiteListCount > 0, "No whitelisted accounts");

        uint256 perWalletAmount = totalAmount / whiteListCount;
        
        for (uint256 i = 0; i < addressList.length; i++) {
            if (whiteList[addressList[i]]) {
                hasClaimed[addressList[i]] = false;
            }
        }

        distributionStartTime = block.timestamp;
        totalClaimed = 0;

        emit FundsDistributed(totalAmount, perWalletAmount, whiteListCount);
    }

    function claim() external notBlackListed {
        require(whiteList[msg.sender], "Only whitelisted accounts can claim");
        require(!hasClaimed[msg.sender], "Already claimed");
        require(block.timestamp <= distributionStartTime + CLAIM_PERIOD, "Claim period has ended");

        uint256 totalAmount = address(this).balance;
        uint256 whiteListCount = 0;
        for (uint256 i = 0; i < addressList.length; i++) {
            if (whiteList[addressList[i]]) {
                whiteListCount++;
            }
        }

        uint256 perWalletAmount = totalAmount / whiteListCount;

        hasClaimed[msg.sender] = true;
        totalClaimed += perWalletAmount;

        payable(msg.sender).transfer(perWalletAmount);

        emit Claimed(msg.sender, perWalletAmount);
    }

    function distributeRemainingFunds() external onlyAdmin {
        require(block.timestamp > distributionStartTime + CLAIM_PERIOD, "Claim period has not ended yet");

        uint256 remainingAmount = address(this).balance;
        uint256 whiteListCount = 0;

        for (uint256 i = 0; i < addressList.length; i++) {
            if (whiteList[addressList[i]] && !hasClaimed[addressList[i]]) {
                whiteListCount++;
            }
        }

        uint256 perWalletAmount = remainingAmount / whiteListCount;

        for (uint256 i = 0; i < addressList.length; i++) {
            if (whiteList[addressList[i]] && !hasClaimed[addressList[i]]) {
                payable(addressList[i]).transfer(perWalletAmount);
            }
        }
    }

    function setMessage(address _account, string calldata _message) external onlyAdmin {
        require(whiteList[_account] || blackList[_account], "Account must be whitelisted or blacklisted");
        messages[_account] = _message;
        emit MessageUpdated(_account, _message);
    }

    function getMessage(address _account) external view returns (string memory) {
        return messages[_account];
    }

    receive() external payable {}
}
