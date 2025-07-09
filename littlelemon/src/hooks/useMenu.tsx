import {
  createMenuItem,
  deleteMenuItem,
  listMenuItems,
  retrieveMenuItem,
  updateMenuItem,
  type menu_type,
  type menu_post_type,
} from "@/apis/menuapis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListMenuItems = () => {
  return useQuery<menu_type[], Error>({
    queryKey: ["menu-items"],
    queryFn: listMenuItems,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<menu_type, Error, menu_post_type>({
    mutationFn: (menuData) => createMenuItem(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useRetrieveMenuItem = (id: number) => {
  return useQuery<menu_type, Error>({
    queryKey: ["menu-item", id],
    queryFn: () => retrieveMenuItem(id),
    enabled: !!id,
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<menu_type, Error, menu_type>({
    mutationFn: (menuData) => updateMenuItem(menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};
