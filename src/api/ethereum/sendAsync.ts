import opportunityService from '../../OpportunityService'

export async function sendAsync(method, params, from) {
  return new Promise(async (resolve, reject) => {
    await opportunityService
      .getDefaultProviderInterface()
      .currentProvider.sendAsync(
        {
          id: 1,
          method,
          params,
          from,
        },
        async function (error, result) {
          if (error) {
            console.log(error)
            throw error
          }

          const realResult = result.result.toString().slice(2)
          const r = '0x' + realResult.slice(0, 64)
          const s = '0x' + realResult.slice(64, 128)
          const v = parseInt(realResult.substring(128, 130), 16)

          resolve({
            v,
            r,
            s,
          })
        },
      )
  })
}
