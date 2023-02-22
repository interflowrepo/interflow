import { View, Text } from 'react-native'
import React from 'react'
import UserPostCard from './UserPostCard'

const userPosts = [
  {
    id: 1,
    name: 'Post 1',
    description: 'This is the first Post',
  },
  {
    id: 2,
    name: 'Post 2',
    description: 'This is the second Post',
  },
  {
    id: 3,
    name: 'Post 3',
    description: 'This is the third Post',
  },
  {
    id: 4,
    name: 'Post 4',
    description: 'This is the fourth Post',
  },
  {
    id: 5,
    name: 'Post 5',
    description: 'This is the fifth Post',
  },
]

export default function UserPosts({ onPress }) {
  return (
    <View>
      {userPosts.map((post) => (
        <UserPostCard
          key={post.id}
          name={post.name}
          description={post.description}
          onPress={onPress}
        />
      ))}
    </View>
  )
}
