'use server'

export async function addNewJob(userData) {
    const baseUrl = 'http://localhost:1337';
    const url = new URL("/api/jobs", baseUrl);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: {...userData , sendingDate: new Date()} }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}

export async function deleteJob(id : number) {
    const baseUrl = 'http://localhost:1337';
    const url = new URL(`/api/jobs/${id}`, baseUrl);
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { id } }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Job Service Error:", error);
    }
}