import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  let filter = null;
  if (filterValue !== "all")
    filter = { field: "status", value: filterValue, operation: "eq" };

  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");

  const sortBy = { field, direction };
  const {
    isPending: isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { isLoading, bookings, error };
};
