var MetaCoin = artifacts.require("./MetaCoin.sol");
var Token = artifacts.require("./Token.sol");


module.exports = function(deployer) {
  deployer.deploy(MetaCoin);
  deployer.deploy(Token);
};
