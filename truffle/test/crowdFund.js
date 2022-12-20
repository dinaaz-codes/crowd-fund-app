const CrowdFund = artifacts.require("CrowdFund");



contract('CrowdFund',async (accounts) => {
  let CrowdFundInstance;

  beforeEach(async ()=>{
    CrowdFundInstance = await CrowdFund.new("End Hunger Fund");
  });

  it('should get fund name', async() => {
    const value = (await CrowdFundInstance.fundName.call()).toString();

    assert.equal(value, "End Hunger Fund", "Fund name should be End Hunger Fund");
  });

  it('should contribute to the fund',async () => {
    const contributionAmount = 10**18; 
    await CrowdFundInstance.contribute({from:accounts[1],value:contributionAmount});
    const totalContributionValue = (await CrowdFundInstance.allTimeContributions.call()).toString();

    assert.equal(contributionAmount.toString(),totalContributionValue, "Contributed Fund should be added to the balance")
  });

  it('should have proper owner',async () => {
      const expectedOwner = accounts[0];

      const owner = (await CrowdFundInstance.owner.call()).toString();

      assert.equal(owner,expectedOwner, `Owner should be ${expectedOwner}`)
  });

  describe('Withdrawals',()=>{
    it("should fail when withdrawal is not owner", async ()=>{
      let hasFailed = false;
      try{
        const sender = accounts[1];

        const contributionAmount = 10**18; 
        await CrowdFundInstance.contribute({from:accounts[2],value:contributionAmount});
  
        await CrowdFundInstance.withdraw({from:sender});
         
        const balance = (await CrowdFundInstance.getBalance.call()).toNumber();
      }catch(err){
          hasFailed=true;
      }
      assert.equal(hasFailed,true,"Only owner should be able to withdraw")
    });

    it("should pass when withdrawal is owner",async ()=>{
       const owner = accounts[0];

       const contributionAmount = 10**18; 
       await CrowdFundInstance.contribute({from:accounts[1],value:contributionAmount});

       await CrowdFundInstance.withdraw({from:owner});
       
       const balance = (await CrowdFundInstance.getBalance.call()).toNumber();

       assert.equal(balance,0,"Balance should be zero")
    })
  })
});
