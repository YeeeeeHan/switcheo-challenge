const Balance = artifacts.require('Balance.sol');

contract('Balance', accounts => {
    it('constructor should set the message correctly', async() => {
        let instance = await Balance.deployed();
        let message = await instance.message();
        assert.equal(message, "hello from constructor")
    })

    it('owner should be accounts[0]', async() => {
        let instance = await Balance.deployed();
        let owner = await instance.owner();
        assert.equal(owner, accounts[0])
    })
})