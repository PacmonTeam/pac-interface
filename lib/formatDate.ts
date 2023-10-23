import { format } from "date-fns";

export const formatDate = (
  data: string | Date,
  options = { showTime: false }
) => {
  const date = new Date(data);
  return format(date, options ? "dd MMM yyyy HH:mm" : "dd MMM yyyy");
};
