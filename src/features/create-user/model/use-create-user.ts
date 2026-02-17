import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { createUser, userKeys } from "@/entities/user";

export const useCreateUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      notification.success({ message: "Пользователь создан" });
      onSuccess?.();
    },
    onError: () => {
      notification.error({ message: "Ошибка при создании пользователя" });
    },
  });
};