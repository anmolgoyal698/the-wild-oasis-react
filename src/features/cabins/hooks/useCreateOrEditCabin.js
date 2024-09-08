import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateOrEditCabin = ({ editMode, reset }) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: editMode ? updateCabin : createCabin,
    onSuccess: (data) => {
      const successMessage = editMode
        ? "Cabin updated successfully"
        : "New cabin successfully created";
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(editMode ? data : undefined);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
};
