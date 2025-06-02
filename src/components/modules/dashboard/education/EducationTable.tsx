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

export interface IEducationType {
    id: string
    institution: string
    degree: string
    startDate: string
    endDate: string
    description: string
    createdAt: string
    updatedAt: string
}

interface EducationsTableProps {
    educations: IEducationType[]
}

export const EducationsTable = ({
    educations,
}: EducationsTableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>Degree</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {educations?.map((educations) => (
                        <TableRow key={educations.id}>

                            <TableCell className="font-medium">{educations?.degree}</TableCell>
                            <TableCell className="font-medium">{educations?.institution}</TableCell>

                            <TableCell className="font-normal">{
                                (new Date(educations?.startDate)).toDateString()
                            }</TableCell>
                            <TableCell className="font-normal">{
                                (new Date(educations?.endDate)).toDateString()
                            }</TableCell>

                            <TableCell className="flex gap-2">
                                <Button size="icon" variant="ghost" className="cursor-pointer">
                                    <PencilIcon className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="cursor-pointer">
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