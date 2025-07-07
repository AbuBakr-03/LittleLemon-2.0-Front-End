import {
  createCategory,
  deleteCategory,
  listCategories,
  retrieveCategory,
  updateCategory,
  type category_post_type,
  type category_type,
} from "@/apis/categoryapis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListCategories = () => {
  return useQuery<category_type[], Error>({
    queryKey: ["categories"],
    queryFn: listCategories,
  });
};
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<category_type, Error, category_post_type>({
    mutationFn: (cat_data) => createCategory(cat_data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<category_type, Error, category_type>({
    mutationFn: (cat_data) => updateCategory(cat_data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
export const useRetrieveCategory = (id: number) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => retrieveCategory(id),
    enabled: !!id,
  });
};
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
};
