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

export interface ISkillType {
    id: string
    name: string
    type: string
    icon: string
    createdAt: string
    updatedAt: string
}

interface SkillsTableProps {
    skills: ISkillType[]
}

export const SkillsTable = ({
    skills,
}: SkillsTableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skills?.map((skills) => (
                        <TableRow key={skills.id}>
                            <TableCell>
                                <Image
                                    src={skills?.icon}
                                    alt={skills?.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{skills?.name}</TableCell>
                            <TableCell className="space-x-1">
                                {skills?.type}
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