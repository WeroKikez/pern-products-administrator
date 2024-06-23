import { PropsWithChildren } from "react";

const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <div className={`text-center my-4 text-white bg-red-600 font-bold p-3 uppercase`}>
        {children}
    </div>
  )
}

export default ErrorMessage;