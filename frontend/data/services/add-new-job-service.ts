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
            body: JSON.stringify({ ...userData, sendingDate: new Date() }),
            cache: "no-cache",
        });
        return response.json();
    } catch (error) {
        console.error("Registration Service Error:", error);
    }
}