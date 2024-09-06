import React, { useState } from 'react'

export function DropdownMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative">
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  )
}

export function DropdownMenuTrigger({ children, isOpen, setIsOpen }) {
  return React.cloneElement(children, { onClick: () => setIsOpen(!isOpen) })
}

export function DropdownMenuContent({ children, isOpen }) {
  if (!isOpen) return null
  return (
    <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {children}
    </div>
  )
}

export function DropdownMenuItem({ children, onSelect }) {
  return (
    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" 
         role="menuitem" onClick={onSelect}>
      {children}
    </div>
  )
}
