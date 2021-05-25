import React from 'react'

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>
}

export const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' })
export const ArrowRight = Arrow({ text: '>', className: 'arrow-next' })
