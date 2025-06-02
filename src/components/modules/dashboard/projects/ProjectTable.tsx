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
import Image from "next/image"

export interface ProjectType {
    id: string
    title: string
    description: string
    image: string
    techStack: string[]
    liveUrl: string
    githubUrl: string
    isTeam: boolean
    teamSize: number | null
    roleInTeam: string | null
    startDate: string | null
    endDate: string | null
    createdAt: string
    updatedAt: string
}

interface ProjectsTableProps {
    projects: ProjectType[]
    // onEdit: (id: string) => void
    // onDelete: (id: string) => void
}

export const ProjectsTable = ({
    projects,
    // onEdit,
    // onDelete
}: ProjectsTableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Tech Stack</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects?.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell className="space-x-1">
                                {project.techStack.slice(0, 3).map((tech, index) => (
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