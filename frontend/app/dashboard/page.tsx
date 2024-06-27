import React from 'react';
import {JobTable} from "@/components/custom/JobTable";

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
        <div className='container'>
            <JobTable jobItems={jobItems.data}/>
        </div>
    );
};

export default Page;