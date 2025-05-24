"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IMessage {
    id: string
    name: string
    email: string
    message: string
    createdAt?: string
}

interface MessageListProps {
    messages: IMessage[]
    onDelete?: (id: string) => void
}

const MessageList = ({ messages, onDelete }: MessageListProps) => {
    const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = (msg: IMessage) => {
        setSelectedMessage(msg)
        setIsOpen(true)
    }

    return (
        <>
            <div className="rounded-md border divide-y">
                {messages?.map((msg) => (
                    <div
                        key={msg.id}
                        onClick={() => openModal(msg)}
                        className={cn(
                            "group cursor-pointer flex items-center justify-between p-4 hover:bg-muted/50 transition-colors bg-white rounded-none sm:rounded-xl"
                        )}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:justify-between">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-base truncate">{msg.name} — {msg.email}</p>
                                <p className="text-sm ">{msg.message.slice(0, 100)}</p>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete?.(msg.id)
                                }}
                                className="text-red-500 hover:text-red-600"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMessage && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="max-w-lg w-[95vw]">
                        <DialogHeader>
                            <DialogTitle>{selectedMessage.name}</DialogTitle>
                            <DialogDescription>{selectedMessage.email}</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 whitespace-pre-wrap">
                            {selectedMessage.message}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default MessageList
