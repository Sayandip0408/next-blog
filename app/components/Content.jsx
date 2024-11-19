import React from 'react'

const Content = ({ content }) => {
  return (
    <div
      className=""
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Content