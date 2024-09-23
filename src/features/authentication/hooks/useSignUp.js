import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isPending: isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created ! Please verify the new account from user's email address"
      );
    },
  });

  return { isLoading, signUp };
};
