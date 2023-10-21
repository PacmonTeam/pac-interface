import { format } from "date-fns";

export const formatDate = (data: string | Date) => {
  const date = new Date(data);
  return format(date, "dd MMM yyyy HH:mm");
};
