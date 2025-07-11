import {
  createMenuItemPrivate,
  deleteMenuItemPrivate,
  listMenuItems,
  listMenuItemsPrivate,
  retrieveMenuItemPrivate,
  updateMenuItemPrivate,
  type menu_type,
  type menu_post_type,
} from "@/apis/menuapis";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Public hook (no auth required)
export const useListMenuItems = () => {
  return useQuery<menu_type[], Error>({
    queryKey: ["menu-items"],
    queryFn: listMenuItems,
  });
};

// Private hooks (require auth)
export const useListMenuItemsPrivate = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery<menu_type[], Error>({
    queryKey: ["menu-items-private"],
    queryFn: () => listMenuItemsPrivate(axiosPrivate),
    enabled: !!axiosPrivate,
  });
};

export const useCreateMenuItemPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<menu_type, Error, menu_post_type>({
    mutationFn: (menuData) => createMenuItemPrivate(axiosPrivate, menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useRetrieveMenuItemPrivate = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery<menu_type, Error>({
    queryKey: ["menu-item-private", id],
    queryFn: () => retrieveMenuItemPrivate(axiosPrivate, id),
    enabled: !!id && !!axiosPrivate,
  });
};

export const useUpdateMenuItemPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<menu_type, Error, menu_type>({
    mutationFn: (menuData) => updateMenuItemPrivate(axiosPrivate, menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

export const useDeleteMenuItemPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteMenuItemPrivate(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });
};

// Legacy hooks for backward compatibility (using private axios for dashboard)
export const useCreateMenuItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<menu_type, Error, menu_post_type>({
    mutationFn: (menuData) => createMenuItemPrivate(axiosPrivate, menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
    },
  });
};

export const useRetrieveMenuItem = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery<menu_type, Error>({
    queryKey: ["menu-item", id],
    queryFn: () => retrieveMenuItemPrivate(axiosPrivate, id),
    enabled: !!id && !!axiosPrivate,
  });
};

export const useUpdateMenuItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<menu_type, Error, menu_type>({
    mutationFn: (menuData) => updateMenuItemPrivate(axiosPrivate, menuData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteMenuItemPrivate(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
      queryClient.invalidateQueries({ queryKey: ["menu-items-private"] });
    },
  });
};
