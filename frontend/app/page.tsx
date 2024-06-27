import Image from "next/image";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
async function getStrapiData(dataForm: FormData) {
  'use server'
  try {
    const res = await fetch(`http://localhost:1337/api/${dataForm && dataForm.get('text')}`, {cache: "no-store"})
    const data = res.json()
    console.log(`http://localhost:1337/api/${dataForm && dataForm.get('text')}`)
    return data;
  } catch (err) {
    throw new Error(err)
  }
}

export default async function Home() {

  const data = await getStrapiData();
  const {company, title, sendingDate, status} = data?.attributes

  const handleSearch = async (dataForm: FormData) => {
    'use server'
    const { data } = await getStrapiData(dataForm);
    const {company, title, sendingTime, status} = data.attributes
    return data.attributes
  }






  return (
      <main className="flex min-h-screen flex-col p-24">
        <form action={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="text" name='text'/>
          <Button type="submit">Subscribe</Button>
        </form>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell className="font-medium">{company}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{sendingDate}</TableCell>
                <TableCell className="text-right">{status}</TableCell>
              </TableRow>
          </TableBody>
        </Table>

      </main>
  );
}
