'use server'

import {getAuthToken} from "@/data/services/get-token";
import {getMyUserData} from "@/data/services/get-my-user-data";
import { getStrapiURL } from "@/lib/utils";

export async function addNewJob(userData) {
    const baseUrl = getStrapiURL();
    const url = new URL("/api/jobs", baseUrl);
    const authToken = await getAuthToken();
    const user = await getMyUserData()

    console.log(user, 'user addNewJob')
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ data: {...userData , sendingDate: new Date(), parentId: user.data.id} }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}

export async function findJobById(companyName:string) {
    const baseUrl = getStrapiURL();
    const authToken = await getAuthToken();
    const user = await getMyUserData()
    const url = new URL(`/api/jobs?filters[company][$eq]=${companyName}&[parentId][$eq]=${user?.data?.id}`, baseUrl);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}

export async function deleteJob(id : number) {
    const baseUrl = getStrapiURL();
    const url = new URL(`/api/jobs/${id}`, baseUrl);
    const authToken = await getAuthToken();
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ data: { id }, }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}

export async function updateJobStatus(id : number, data) {
    const baseUrl = getStrapiURL();
    const url = new URL(`/api/jobs/${id}`, baseUrl);
    const authToken = await getAuthToken();
    console.log(data, id, 'console update')
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify( {
                data: {
                    status: data
                }
            }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}