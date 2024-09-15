import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    data: booking,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, isLoading, error };
};
