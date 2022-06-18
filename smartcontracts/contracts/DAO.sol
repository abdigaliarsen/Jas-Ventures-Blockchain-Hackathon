// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/MarketplaceERC1155.sol";
import "./token/MarketplaceERC20.sol";

contract DAO {
    uint256 public CREATION_COST = 20;

    struct Voting {
        address chairman;
        address targetContract;
        bytes signature;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 startedTime;
        uint256 votingPeriod;
    }

    mapping(uint256 => bool) public tokenUsed;
    mapping(uint256 => Voting) public votings;
    mapping(uint256 => mapping(address => bool)) public voters;

    MarketplaceERC1155 public immutable erc1155;
    MarketplaceERC20 public immutable erc20;

    event VotingAdded(
        uint256 indexed tokenId,
        address targetContract,
        bytes signature,
        address chairman
    );
    event Voted(uint256 indexed tokenId, bool votedFor, address voter);
    event VotingFinished(uint256 indexed tokenId, bool won);

    constructor(address _erc20, address _erc1155) {
        erc1155 = MarketplaceERC1155(_erc1155);
        erc20 = MarketplaceERC20(_erc20);
    }

    modifier tokenUnused(uint256 _tokenId) {
        require(
            tokenUsed[_tokenId] == false,
            "DAO: Cannot reuse token to create voting"
        );
        _;
    }

    modifier tokenExists(uint256 _tokenId) {
        require(
            erc1155.exists(_tokenId) == true,
            "DAO: ERC1155 token doesn't exist"
        );
        _;
    }

    function createVoting(
        uint256 _tokenId,
        address _targetContract,
        bytes memory _signature,
        uint256 _votingPeriod
    ) external tokenUnused(_tokenId) tokenExists(_tokenId) {
        require(_targetContract != address(0), "DAO: Invalid target contract");
        require(_votingPeriod != 0, "DAO: Cannot set zero time period");

        erc20.transferFrom(msg.sender, address(this), CREATION_COST);
        votings[_tokenId] = Voting({
            chairman: msg.sender,
            votesFor: 0,
            votesAgainst: 0,
            targetContract: _targetContract,
            signature: _signature,
            startedTime: block.timestamp,
            votingPeriod: _votingPeriod
        });

        emit VotingAdded(_tokenId, _targetContract, _signature, msg.sender);
    }

    function vote(uint256 _tokenId, bool _voteFor, uint256 _amount)
        external
        tokenUnused(_tokenId)
        tokenExists(_tokenId)
    {
        require(_amount != 0, "DAO: Amount cannot be zero");
        require(
            voters[_tokenId][msg.sender] == false,
            "DAO: User already voted"
        );
        require(
            votings[_tokenId].startedTime + votings[_tokenId].votingPeriod >=
                block.timestamp,
            "DAO: Voting period is over"
        );

        Voting storage voting = votings[_tokenId];
        if (_voteFor == true) voting.votesFor += _amount;
        else voting.votesAgainst += _amount;
        voters[_tokenId][msg.sender] = true;

        emit Voted(_tokenId, _voteFor, msg.sender);
    }

    function finishVoting(uint256 _tokenId)
        external
        tokenUnused(_tokenId)
        tokenExists(_tokenId)
    {
        require(
            votings[_tokenId].startedTime + votings[_tokenId].votingPeriod <
                block.timestamp,
            "DAO: Voting period is not over yet"
        );
        Voting storage voting = votings[_tokenId];
        if (voting.votesFor > voting.votesAgainst) {
            (bool success, ) = voting.targetContract.call{value: 0}(
                voting.signature
            );
            require(success, "DAO: ERROR call func");
        }
        tokenUsed[_tokenId] = true;
        emit VotingFinished(_tokenId, voting.votesFor > voting.votesAgainst);
        delete votings[_tokenId];
    }
}
