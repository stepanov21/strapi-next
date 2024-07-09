import React from "react";
import { JobTable } from "@/components/custom/JobTable";
import AddJobItem from "@/components/custom/AddJobItem";
import { getAuthToken } from "@/data/services/get-token";
import { getMyUserData } from "@/data/services/get-my-user-data";
import { getStrapiURL } from "@/lib/utils";

export async function getStrapiJobs() {
  const authToken = await getAuthToken();
  const user = await getMyUserData();
  const baseUrl = getStrapiURL();
  const url = new URL(
    `${baseUrl}/api/jobs?filters[parentId][$eq]=${user?.data?.id}`,
    baseUrl
  );
  console.log(url);
  if (!user) return;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export type TStatus = "in proccess" | "acepted" | "rejected";

export interface IJobItem {
  id: number;
  attributes: {
    company: string;
    jobTitle: string;
    status: TStatus;
    sendingDate: string;
  };
}

const Page = async () => {
  const jobItems = await getStrapiJobs();
  console.log(jobItems);
  return (
    <div>
      <AddJobItem />
      {jobItems?.data ? (
        <JobTable jobItems={jobItems.data} />
      ) : (
        <h2>Ничего нет</h2>
      )}
    </div>
  );
};

export default Page;
