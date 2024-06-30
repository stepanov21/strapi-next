'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {IJobItem} from "@/app/dashboard/page";
import {EditJob} from "@/components/custom/EditJob";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export function JobTable({jobItems} : {jobItems: IJobItem[]}) {
    console.log(jobItems)
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Компания</TableHead>
                    <TableHead>Вакансия</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Дата подачи</TableHead>
                    <TableHead className="text-right">Ред.</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobItems.map((invoice, id) => (
                    <TableRow key={id}>
                        <TableCell className="font-medium">{invoice.attributes.company}</TableCell>
                        <TableCell>{invoice.attributes.jobTitle}</TableCell>
                        <TableCell>{invoice.attributes.status}</TableCell>
                        <TableCell className="text-right mr-auto">{invoice.attributes.sendingDate}</TableCell>
                        <TableCell className="text-right mr-auto"><EditJob jobId={invoice.id}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{jobItems.length} заявки</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
