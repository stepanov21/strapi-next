import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Settings} from "lucide-react";

import {deleteJobAction} from "@/data/action/job-action";


export function EditJob({jobId} : {jobId: number}) {
    const deleteJobById = (id: number) => {
        deleteJobAction(id)
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className='px-3'><Settings size={16}/></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div >
                            <Button className="w-full" onClick={() => deleteJobById(jobId)}>Удалить</Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
