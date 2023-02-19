export const injectedJavaScript= `
const view = {
    fclVersion: "1.4.0-alpha.1",
    type: "FCL:VIEW:READY:RESPONSE",
    body: {},
    service: {
      type: "authn",
    },
    config: {
      services: {},
      app: {
      },
      client: {
        discoveryAuthnInclude: ["0x82ec283f88a62e65"],
        clientServices: [
          {
            f_type: "Service",
            f_vsn: "1.0.0",
            type: "authn",
            uid: "Lilico",
            endpoint:
              "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html",
            method: "EXT/RPC",
            id: "hpclkefagolihohboafpheddmmgdffjm",
            identity: {
              address: "0x33f75ff0b830dcec",
            },
            provider: {
              address: "0x33f75ff0b830dcec",
              name: "Lilico",
              icon: "https://lilico.app/logo.png",
              description:
                "Lilico is bringing an out of the world experience to your crypto assets on Flow",
            },
          },
        ],
        supportedStrategies: [
          "HTTP/RPC",
          "HTTP/POST",
          "IFRAME/RPC",
          "POP/RPC",
          "TAB/RPC",
          "EXT/RPC",
        ],
        fclVersion: "1.4.0-alpha.1",
        fclLibrary: "https://github.com/onflow/fcl-js",
        hostname: "localhost",
        network: "testnet",
      },
    },
  };

  const frame = {
    fclVersion: "1.4.0-alpha.1",
    type: "FCL:FRAME:READY:RESPONSE",
    body: {},
    service: {
      type: "authn",
    },
    config: {
      services: {},
      app: {
      },
      client: {
        discoveryAuthnInclude: ["0x82ec283f88a62e65"],
        clientServices: [
          {
            f_type: "Service",
            f_vsn: "1.0.0",
            type: "authn",
            uid: "Lilico",
            endpoint:
              "chrome-extension://hpclkefagolihohboafpheddmmgdffjm/popup.html",
            method: "EXT/RPC",
            id: "hpclkefagolihohboafpheddmmgdffjm",
            identity: {
              address: "0x33f75ff0b830dcec",
            },
            provider: {
              address: "0x33f75ff0b830dcec",
              name: "Lilico",
              icon: "https://lilico.app/logo.png",
              description:
                "Lilico is bringing an out of the world experience to your crypto assets on Flow",
            },
          },
        ],
        supportedStrategies: [
          "HTTP/RPC",
          "HTTP/POST",
          "IFRAME/RPC",
          "POP/RPC",
          "TAB/RPC",
          "EXT/RPC",
        ],
        fclVersion: "1.4.0-alpha.1",
        fclLibrary: "https://github.com/onflow/fcl-js",
        hostname: "localhost",
        network: "testnet",
      },
    },
    deprecated: {
      message:
        "FCL:FRAME:READY:RESPONSE is deprecated and replaced with type: FCL:VIEW:READY:RESPONSE",
    },
  };

  
`