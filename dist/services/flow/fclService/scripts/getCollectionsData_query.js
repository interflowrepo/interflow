"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCollectionsData_query = void 0;
const getCollectionsData_query = `
  import FungibleToken from 0x9a0766d93b6608b7
  import NonFungibleToken from 0x631e88ae7f1d7c20
  import MetadataViews from 0x631e88ae7f1d7c20

  pub struct CollectionDisplay {
    pub let name: String
    pub let squareImage: MetadataViews.Media
    pub let bannerImage: MetadataViews.Media

    init(name: String, squareImage: MetadataViews.Media, bannerImage: MetadataViews.Media) {
      self.name = name
      self.squareImage = squareImage
      self.bannerImage = bannerImage
    }
  }

  pub struct Item {
      pub let address: Address
      pub let display: CollectionDisplay?
      pub let tokenIDs: [UInt64]
  
      init(address: Address, display: CollectionDisplay?, tokenIDs: [UInt64]) {
          self.address = address
          self.display = display
          self.tokenIDs = tokenIDs
      }
  }

  pub fun main(addresses: [Address], pathIdentifiers: [String]): [Item] {
    let items: [Item] = []

    for address in addresses {
      let account = getAuthAccount(address)
      let resourceType = Type<@AnyResource>()
      let vaultType = Type<@FungibleToken.Vault>()
      let collectionType = Type<@NonFungibleToken.Collection>()
      let metadataViewType = Type<@AnyResource{MetadataViews.ResolverCollection}>()

      for identifier in pathIdentifiers {
        let path = StoragePath(identifier: identifier)!

        if let type = account.type(at: path) {
          let isResource = type.isSubtype(of: resourceType)
          let isNFTCollection = type.isSubtype(of: collectionType)
          let conformedMetadataViews = type.isSubtype(of: metadataViewType)

          var tokenIDs: [UInt64] = []
          var collectionDisplay: CollectionDisplay? = nil

          if isNFTCollection && conformedMetadataViews {
            if let collectionRef = account.borrow<&{MetadataViews.ResolverCollection, NonFungibleToken.CollectionPublic}>(from: path) {
              tokenIDs = collectionRef.getIDs()

              if tokenIDs.length > 0 
              && path != /storage/RaribleNFTCollection 
              && path != /storage/ARTIFACTPackV3Collection
              && path != /storage/ArleeScene {
                let resolver = collectionRef.borrowViewResolver(id: tokenIDs[0]) 
                if let display = MetadataViews.getNFTCollectionDisplay(resolver) {
                  collectionDisplay = CollectionDisplay(
                    name: display.name,
                    squareImage: display.squareImage,
                    bannerImage: display.bannerImage
                  )

                  let item = Item(
                      address: address,
                      display: collectionDisplay,
                      tokenIDs: tokenIDs,
                    )
                    items.append(item)
                }
              }
            }
          }
        }
      }
    }
    return items
  }
`;
exports.getCollectionsData_query = getCollectionsData_query;