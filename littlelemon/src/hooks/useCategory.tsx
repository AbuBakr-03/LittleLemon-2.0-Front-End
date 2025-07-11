import {
  createCategoryPrivate,
  deleteCategoryPrivate,
  listCategories,
  listCategoriesPrivate,
  retrieveCategory,
  retrieveCategoryPrivate,
  updateCategoryPrivate,
  type category_post_type,
  type category_type,
} from "@/apis/categoryapis";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Public hook (no auth required)
export const useListCategories = () => {
  return useQuery<category_type[], Error>({
    queryKey: ["categories"],
    queryFn: listCategories,
  });
};

// Private hooks (require auth)
export const useListCategoriesPrivate = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery<category_type[], Error>({
    queryKey: ["categories-private"],
    queryFn: () => listCategoriesPrivate(axiosPrivate),
    enabled: !!axiosPrivate,
    retry: false, // 🔑 ADD THIS LINE
  });
};

export const useCreateCategoryPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<category_type, Error, category_post_type>({
    mutationFn: (cat_data) => createCategoryPrivate(axiosPrivate, cat_data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategoryPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<category_type, Error, category_type>({
    mutationFn: (cat_data) => updateCategoryPrivate(axiosPrivate, cat_data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useRetrieveCategoryPrivate = (id: number) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["category-private", id],
    queryFn: () => retrieveCategoryPrivate(axiosPrivate, id),
    enabled: !!id && !!axiosPrivate,
    retry: false, // 🔑 ADD THIS LINE
  });
};

export const useDeleteCategoryPrivate = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteCategoryPrivate(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Legacy hooks for backward compatibility (using private axios for dashboard)
export const useCreateCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<category_type, Error, category_post_type>({
    mutationFn: (cat_data) => createCategoryPrivate(axiosPrivate, cat_data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
    },
  });
};

export const useUpdateCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<category_type, Error, category_type>({
    mutationFn: (cat_data) => updateCategoryPrivate(axiosPrivate, cat_data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
    },
  });
};

export const useRetrieveCategory = (id: number) => {

  return useQuery({
    queryKey: ["category", id],
    queryFn: () => retrieveCategory( id),
    enabled: !!id,
  });
};

export const useDeleteCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteCategoryPrivate(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories-private"] });
    },
  });
};
