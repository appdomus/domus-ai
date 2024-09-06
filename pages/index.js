import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MenuIcon, SendIcon, MicIcon, PlusIcon } from 'lucide-react'

export default function Component() {
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Reserva de Sala Común', lastMessage: 'Su reserva está confirmada.' },
    { id: 2, name: 'Mantenimiento Piscina', lastMessage: 'El mantenimiento está programado para...' },
  ])
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bienvenido al Asistente de Gestión de Edificios. ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = useState('')
  const [currentConversation, setCurrentConversation] = useState('Passa A Plus')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // Simular respuesta de la IA (en una app real, esto sería manejado por un backend)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Entendido. Estoy procesando tu solicitud de reserva. ¿Podrías confirmarme la fecha y hora que prefieres?' 
        }])
      }, 1000)
      setInput('')
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted p-4">
        <Button variant="outline" className="w-full mb-4">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nueva conversación
        </Button>
        <ScrollArea className="h-[calc(100vh-80px)]">
          {conversations.map((conv) => (
            <div key={conv.id} className="mb-2 p-2 hover:bg-accent rounded cursor-pointer">
              <div className="font-medium">{conv.name}</div>
              <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
          <MenuIcon className="h-6 w-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full px-4">
                {currentConversation}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setCurrentConversation('Passa A Plus')}>
                Passa A Plus
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentConversation('Edificio Central')}>
                Edificio Central
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCurrentConversation('Torre Norte')}>
                Torre Norte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-6" /> {/* Spacer for alignment */}
        </header>

        <ScrollArea className="flex-grow p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                  <AvatarImage src={message.role === 'user' ? '/placeholder-user.jpg' : '/placeholder.svg?height=40&width=40'} />
                </Avatar>
                <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center">
            <Button type="button" size="icon" variant="ghost" className="mr-2">
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Añadir archivo</span>
            </Button>
            <Input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button type="submit" size="icon" className="mr-2">
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
            <Button type="button" size="icon" variant="ghost">
              <MicIcon className="h-4 w-4" />
              <span className="sr-only">Mensaje de voz</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
