function enterWorkRelationship(relationshipAddress, evaluationState, callback) {
  const abi = Contract.Market.WorkRelationship.abi
  const bytecode =
    '608060405234801561001057600080fd5b50606460008190555060ca806100276000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806380219655146037578063ed0109a5146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b6068608c565b6040518082815260200191505060405180910390f35b806000540160008190555050565b6000805490509056fea265627a7a7230582002f975dfd70c1b1f649671805826a83fc9b92457fe7dd245527f56b7776d043464736f6c634300050a0032'

  const contract = opportunityConnectionProvider
    .getProviderInterface()
    .web3.eth.Contract(JSON.parse(abi)) //web3.eth.Contract(JSON.parse(abi));

  const txParameter: FakeTransaction = {
    from: opportunityConnectionProvider
      .getProviderInterface()
      .web3.eth.getAccounts()[0],
    gasPrice: opportunityConnectionProvider
      .getProviderInterface()
      .web3.utils.toHex(
        opportunityConnectionProvider
          .getProviderInterface()
          .web3.utils.toWei('30', 'gwei'),
      ),
  }

  const isValidWorker = opportunityConnectionProvider
    .getProviderInterface()
    .web3.eth.Contract(contract, relationshipAddress)
    .methods.checkWorkerEvaluation(
      opportunityConnectionProvider
        .getProviderInterface()
        .web3.accounts.getAccounts()[0],
      evaluationState,
    )
    .send(txParameter, callback)
    .on('transactionHash', (hash) => {})
    .on('confirmation', (confirmationNumber, receipt) => {})
    .on('receipt', (receipt) => {
      // receipt example
      console.log(receipt)
    })
    .on('error', (error, receipt) => {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    })
    .then((receipt) => {
      // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    })

  if (isValidWorker === true) {
    opportunityConnectionProvider
      .getProviderInterface()
      .web3.eth.Contract(contract, relationshipAddress)
      .methods.createWorkExchange(
        opportunityConnectionProvider
          .getProviderInterface()
          .web3.accounts.getAccounts()[0],
        true,
      )
      .send(txParameter, callback)
      .on('transactionHash', (hash) => {})
      .on('confirmation', (confirmationNumber, receipt) => {})
      .on('receipt', (receipt) => {
        // receipt example
        console.log(receipt)
      })
      .on('error', (error, receipt) => {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      })
      .then((receipt) => {
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
      })
  }
}

export { enterWorkRelationship }
