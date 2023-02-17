import {invariant} from "@onflow/util-invariant"
import {log, LEVELS} from "@onflow/util-logger"
import {serviceRegistry} from "./plugins"
import {getChainId} from "../../utils"
import {VERSION} from "../../VERSION"
import {configLens} from "../../default-config"

const execStrategy = async ({service, body, config, opts}) => {
  
  //GET WHICH STRATEGY FN TO EXECUTE -> IF IFRAME, WILL CALL THE EXEC IFRAME STRATEGY
  const strategy = serviceRegistry.getStrategy(service.method)

  //EXECUTE THE STRATEGY WITH THE DATA
  console.log('strategy data: ', {service, body, config, opts})
  return strategy({service, body, config, opts})
}

export async function execStrategyData ({service, msg = {}, config = {}, opts = {}}) {
  msg.data = service.data

  const execConfig = {
    services: await configLens(/^service\./),
    app: await configLens(/^app\.detail\./),
    client: {
      ...config.client,
      fclVersion: VERSION,
      fclLibrary: "https://github.com/onflow/fcl-js",
      hostname: window?.location?.hostname ?? null,
      network: await getChainId(),
    },
  }

  // console.log('was here 5', service)

  return {
      service,
      body: msg,
      config: execConfig,
      opts,
    }
}

export async function execService({service, msg = {}, config = {}, opts = {}}) {
  msg.data = service.data

  //CREATE THE EXEC CONFIC OBJECT
  const execConfig = {
    services: await configLens(/^service\./),
    app: await configLens(/^app\.detail\./),
    client: {
      ...config.client,
      fclVersion: VERSION,
      fclLibrary: "https://github.com/onflow/fcl-js",
      hostname: window?.location?.hostname ?? null,
      network: await getChainId(),
    },
  }

  try {
    //EXECUTE THE STRATEGY
    const res = await execStrategy({
      service,
      body: msg,
      config: execConfig,
      opts,
    })
    if (res.status === "REDIRECT") {
      invariant(
        service.type === res.data.type,
        "Cannot shift recursive service type in execService"
      )
      return await execService({
        service: res.data,
        msg,
        config: execConfig,
        opts,
      })
    } else {
      return res
    }
  } catch (error) {
    log({
      title: `Error on execService ${service?.type}`,
      message: error,
      level: LEVELS.error,
    })
    throw error
  }
}
