import { useMutation } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSetting = () => {
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully");
    },
    onError: () => {
      toast.error("Failed to update setting");
    },
  });

  return { isUpdating, updateSetting };
};
