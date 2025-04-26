import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";

type AlertProps = {
  message: string;
};

const Alert = {
  Success: ({ message }: AlertProps) =>
    toast.success(message, {
      icon: <CheckCircle className="text-green-500" />,
    }),

  Error: ({ message }: AlertProps) =>
    toast.error(message, {
      icon: <XCircle className="text-red-500" />,
    }),
};

export default Alert;


// import { toast } from "sonner";
// import { CheckCircle, XCircle } from "lucide-react";

// type AlertProps = {
//   message: string;
// };

// const Alert = {
//   Success: ({ message }: AlertProps) =>
//     toast.success(message, {
//       icon: <CheckCircle className="text-white" />,
//       style: {
//         backgroundColor: "#22c55e", // verde (tailwind: green-500)
//         color: "#fff",
//       },
//     }),

//   Error: ({ message }: AlertProps) =>
//     toast.error(message, {
//       icon: <XCircle className="text-white" />,
//       style: {
//         backgroundColor: "#ef4444", // vermelho (tailwind: red-500)
//         color: "#fff",
//       },
//     }),
// };

// export default Alert;