import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { updateUser, userKeys } from "@/entities/user";

interface EditUserParams {
  id: string;
  data: { name: string; avatar: string };
}

export const useEditUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: EditUserParams) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      notification.success({ message: "Пользователь обновлён" });
      onSuccess?.();
    },
    onError: () => {
      notification.error({ message: "Ошибка при обновлении пользователя" });
    },
  });
};