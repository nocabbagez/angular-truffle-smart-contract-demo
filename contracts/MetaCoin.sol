pragma solidity ^0.4.2;

contract MetaCoin {
	mapping (address => uint) public balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() public {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) 
			return false;
			
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalance(address addr) public returns(uint) {
		return balances[addr];
	}
}
