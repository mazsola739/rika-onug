import React from 'react'
import { useParams } from 'react-router-dom'

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return <div>Welcome to Room {id}!</div>
}

export default Room
