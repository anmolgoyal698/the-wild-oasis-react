import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/globals";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status") || "all";
  let filter = null;
  if (filterValue !== "all")
    filter = { field: "status", value: filterValue, operation: "eq" };

  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");

  const sortBy = { field, direction };

  const page = searchParams.get("page") ? +searchParams.get("page") : 1;

  const queryClient = useQueryClient();
  const {
    isPending: isLoading,
    isFetching,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sort, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // PREFETCH DATA FOR NEXT PAGE
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sort, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if (isFetching) {
    console.log("Fetching data in the background...");
  }

  return { isLoading, bookings, count, error };
};
