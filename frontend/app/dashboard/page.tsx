import React from 'react';
import {JobTable} from "@/components/custom/JobTable";
import AddJobItem from "@/components/custom/AddJobItem";

export async function getStrapiJobs() {
    try {
        const res = await fetch(`http://localhost:1337/api/jobs`, {cache: "no-store"});
        const data = res.json()
        return data
    } catch (err) {
        throw new Error(err)
    }
}

export interface IJobItem {
    id: number
    attributes: {
        company: string,
        jobTitle: string,
        status: string,
        sendingDate: string,
    }
}

const Page = async () => {
    const jobItems = await getStrapiJobs()
    console.log(jobItems.data)
    return (
        <div className='container mt-28'>
            <AddJobItem/>
            <JobTable jobItems={jobItems.data}/>
        </div>
    );
};

export default Page;