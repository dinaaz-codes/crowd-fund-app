const CrowdFund = artifacts.require("CrowdFund");

module.exports = function (deployer) {
  deployer.deploy(CrowdFund,"End Hunger Fund");
};
