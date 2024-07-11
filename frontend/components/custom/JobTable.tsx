"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IJobItem, TStatus } from "@/app/(main)/dashboard/page";
import { EditJob } from "@/components/custom/EditJob";

import ChangeJobStatus from "@/components/custom/ChangeJobStatus";

export const statusColor = {
  "in proccess": "bg-amber-400",
  acepted: " bg-green-700 text-white",
  rejected: "bg-red-800 text-white",
};

export function JobTable({ jobItems }: { jobItems: IJobItem[] }) {
  
  const jobsFilter = (items: IJobItem[], filterName: TStatus) => {
    return items.filter((item) => item.attributes.status === `${filterName}`);
  };


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] ">Компания</TableHead>
          <TableHead>Вакансия</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="text-right sm:hidden">
            Дата подачи
          </TableHead>
          <TableHead className="text-right">Ред.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
        {jobItems.length ? jobItems.map((invoice, id) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {invoice.attributes.company}
            </TableCell>
            <TableCell>{invoice.attributes.jobTitle}</TableCell>
            <TableCell>
              <div className="flex items-center h-full gap-2">
                <span
                  className={`${
                    statusColor[invoice.attributes.status]
                  } px-2 min-w-32 text-center sm:hidden`}
                >
                  {invoice.attributes.status}
                </span>
                <ChangeJobStatus
                  JobId={invoice.id}
                  status={invoice.attributes.status}
                />
              </div>
            </TableCell>
            <TableCell className="text-right mr-auto sm:hidden">
              {invoice.attributes.sendingDate}
            </TableCell>
            <TableCell className="text-right mr-auto">
              <EditJob jobId={invoice.id} />
            </TableCell>
          </TableRow>
        )) : <TableRow><TableCell colSpan={5} className="text-center text-gray-400">Пока что ничего нет, но вы можете добавить</TableCell></TableRow>}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <div className="flex justify-between">
              <div className="font-bold">Всего: {jobItems.length} откликов</div>
              <div>
                <div
                  className={`px-4 inline-block text-right ${statusColor["acepted"]}`}
                >
                  {jobsFilter(jobItems, "acepted").length}
                </div>
                <div
                  className={`px-4 inline-block text-right ${statusColor["rejected"]}`}
                >
                  {jobsFilter(jobItems, "rejected").length}
                </div>
                <div
                  className={`px-4 inline-block text-right ${statusColor["in proccess"]}`}
                >
                  {jobsFilter(jobItems, "in proccess").length}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
