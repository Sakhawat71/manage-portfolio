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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IMessage {
    id: string
    name: string
    email: string
    message: string
}

interface MessageListProps {
    messages: IMessage[]
}

const MessageList = ({ messages }: MessageListProps) => {
    const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (msg: IMessage) => {
        setSelectedMessage(msg)
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setSelectedMessage(null)
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {messages.map((msg) => (
                    <Card key={msg.id} className="p-4 flex flex-col justify-between">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{msg.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{msg.email}</p>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-gray-700 truncate">{msg.message}</p>
                            <Button variant="outline" onClick={() => handleOpen(msg)}>
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{selectedMessage?.name}</DialogTitle>
                        <DialogDescription>{selectedMessage?.email}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4">{selectedMessage?.message}</div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default MessageList
