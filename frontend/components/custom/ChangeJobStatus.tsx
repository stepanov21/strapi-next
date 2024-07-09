import React from 'react';
import {Check, ChevronsRight, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {IJobItem, TStatus} from "@/app/dashboard/page";
import {updateJobStatus} from "@/data/services/job-service";
import {updateJobAction} from "@/data/action/job-action";

interface IStatusVariant {
    icon: React.ReactNode,
    status: TStatus
}

const statusVariant: IStatusVariant[] = [
    {
        icon: <Check size={16}/>,
        status: 'acepted'
    },    {
        icon: <X size={16}/>,
        status: 'rejected'
    },    {
        icon: <ChevronsRight size={16}/>,
        status: 'in proccess'
    },

]

const ChangeJobStatus = ({JobId} : {JobId: number}) => {
    return (
        <>
            {statusVariant.map((item, id) => {
                return <Button key={id} onClick={async() => await updateJobAction(JobId, item.status)} variant="outline" className='border p-2 rounded-md'>{item.icon}</Button>
            })}
        </>
    );
};

export default ChangeJobStatus;
