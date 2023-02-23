export const getNftsData_query = `
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

  pub struct NftDisplay {
    pub let id: UInt64
    pub let thumbnail: AnyStruct

    init(id: UInt64, thumbnail: AnyStruct) {
      self.id = id
      self.thumbnail = thumbnail
    }
  }

  pub struct Item {
      pub let address: Address
      pub let display: CollectionDisplay?
      pub let tokens: [NftDisplay]
  
      init(address: Address, display: CollectionDisplay?, tokens: [NftDisplay]) {
          self.address = address
          self.display = display
          self.tokens = tokens
      }
  }

  pub fun main(addresses: [Address], pathIdentifiers: [String]): [Item] {
    let items: [Item] = []

    for address in addresses {
      let account = getAuthAccount(address)

      let resourceType = Type<@AnyResource>()
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
              let tokens: [NftDisplay] = []

              if tokenIDs.length > 0 
              && path != /storage/RaribleNFTCollection 
              && path != /storage/ARTIFACTPackV3Collection
              && path != /storage/ArleeScene {
                
                for id in tokenIDs {
                  var thumbnail = ""

                  let resolver = collectionRef.borrowViewResolver(id: id)

                  let nftView = MetadataViews.getNFTView(id: id, viewResolver: resolver) 
                    thumbnail = nftView.display!.thumbnail.uri()
                  

                  let nftDisplay = NftDisplay(
                    id: id,
                    thumbnail: thumbnail
                  )
                  tokens.append(nftDisplay)
                }
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
                      tokens: tokens,
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
