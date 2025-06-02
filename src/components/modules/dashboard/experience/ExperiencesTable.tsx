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

export interface IExperienceType {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
    createdAt: string
    updatedAt: string
}

interface ExperiencesTableProps {
    experiences: IExperienceType[]
}

export const ExperiencesTable = ({
    experiences,
}: ExperiencesTableProps) => {
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
                    {experiences?.map((experience) => (
                        <TableRow key={experience.id}>

                            <TableCell className="font-medium">{experience?.position}</TableCell>
                            <TableCell className="font-medium">{experience?.company}</TableCell>

                            <TableCell className="font-normal">{
                                (new Date(experience?.startDate)).toDateString()
                            }</TableCell>
                            <TableCell className="font-normal">{
                                (new Date(experience?.endDate)).toDateString()
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