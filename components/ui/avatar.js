import React from 'react'

export function Avatar({ children, className }) {
  return (
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 ${className}`}>
      {children}
    </div>
  )
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
}

export function AvatarFallback({ children }) {
  return <div className="flex items-center justify-center w-full h-full rounded-full bg-gray-300">{children}</div>
}
