import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authStore from '~/stores/AuthStore';
import { InsertTables } from '~/types';
import { supabase } from '~/utils/supabase';


export const useStudentList = () => useQuery({
  queryKey: ['students'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('teacher_id', authStore.profile?.id || '');
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
})


export const useInsertStudent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      async mutationFn(data: InsertTables<'students'>) {
      const { error } = await supabase.from('students')
        .insert(data)
        .single();
    },
    async onSuccess() {
      await queryClient.invalidateQueries(['students']);
    }
  }
  )
}


