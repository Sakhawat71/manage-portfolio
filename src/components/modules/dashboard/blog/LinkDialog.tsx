"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link2 } from "lucide-react";

interface LinkDialogProps {
    editor: any;
    isActive: boolean;
}

export const LinkDialog = ({ editor, isActive }: LinkDialogProps) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");

    const handleOpen = () => {
        const currentUrl = editor.getAttributes("link").href || "";
        setUrl(currentUrl);
        setOpen(true);
    };

    const handleSubmit = () => {
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant={isActive ? "secondary" : "ghost"} size="sm" onClick={handleOpen}>
                    <Link2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Insert link</DialogTitle>
                </DialogHeader>

                <Input
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />

                <DialogFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
