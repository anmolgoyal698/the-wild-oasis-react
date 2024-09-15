import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} updated successfully`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { isCheckingIn, checkIn };
};
