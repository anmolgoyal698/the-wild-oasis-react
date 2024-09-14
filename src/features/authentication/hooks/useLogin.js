import { useMutation } from "@tanstack/react-query";
import { login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Login error", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { isLoading, mutate };
};
