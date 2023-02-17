const fcl = require("@onflow/fcl");

// TEST CONFIG - To test it, I'm not sure if this will work
fcl.config({
  "app.detail.title": "InterFlow",
  "accessNode.api": "https://rest-testnet.onflow.org",
  // "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/testnet/authn",
  "discovery.authn.include": ["0x82ec283f88a62e65"],
})

