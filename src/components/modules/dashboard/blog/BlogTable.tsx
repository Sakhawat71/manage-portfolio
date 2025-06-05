"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { IBlogs } from "@/types/blog.type"


interface BlogsTableProps {
    blogs: IBlogs[]
    // onEdit: (id: string) => void
    // onDelete: (id: string) => void
}

export const BlogsTable = ({
    blogs,
    // onEdit,
    // onDelete
}: BlogsTableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Tech Stack</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {blogs?.map((blog) => (
                        <TableRow key={blog.id}>
                            
                            <TableCell className="font-medium">{blog.title}</TableCell>
                            <TableCell className="space-x-1">
                                {blog.tags.slice(0, 3).map((tech, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-200 text-xs px-2 py-1 rounded"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell className="flex gap-2">
                                <Button size="icon" variant="ghost">
                                    <PencilIcon className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <TrashIcon className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}