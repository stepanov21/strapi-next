import { redirect } from "next/navigation";


export default async function Home() {
    redirect('/dashboard')
    return (
        <main className="flex min-h-screen flex-col">
            
        </main>
    );
}
