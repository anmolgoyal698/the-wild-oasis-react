import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} updated successfully`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { isCheckingOut, checkout };
};
