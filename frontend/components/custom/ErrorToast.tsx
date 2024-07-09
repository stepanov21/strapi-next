import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";

const ErrorToast = ({ errorFields, message } : {errorFields: any; message: string}) => {
  const { toast } = useToast();
  useEffect(() => {
    if(!errorFields) return 
    toast({
      title: `${message}`,
      description: "Friday, February 10, 2023 at 5:57 PM",
      className: 'max-w-[350px] ml-auto bg-red-200',
    });
  }, [errorFields]);
  return <div></div>;
};

export default ErrorToast;
