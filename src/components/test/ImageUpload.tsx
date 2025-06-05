"use client";

import { uploadImage } from "@/lib/upload";
import { Editor } from "@tiptap/core";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

export function ImageUpload({ editor }: { editor: Editor }) {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const url = await uploadImage(file);
            editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="grid gap-4 py-4">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}