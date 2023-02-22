import { View, Text } from 'react-native'
import React from 'react'
import UserCollectionCard from './UserCollectionCard'

const userCollections = [
  {
    id: 1,
    name: 'Collection 1',
    description: 'This is the first collection',
  },
  {
    id: 2,
    name: 'Collection 2',
    description: 'This is the second collection',
  },
  {
    id: 3,
    name: 'Collection 3',
    description: 'This is the third collection',
  },
  {
    id: 4,
    name: 'Collection 4',
    description: 'This is the fourth collection',
  },
  {
    id: 5,
    name: 'Collection 5',
    description: 'This is the fifth collection',
  },
]

export default function UserCollections({ onPress }) {
  return (
    <View>
      {userCollections.map((collection) => (
        <UserCollectionCard
          key={collection.id}
          name={collection.name}
          description={collection.description}
          onPress={onPress}
        />
      ))}
    </View>
  )
}
