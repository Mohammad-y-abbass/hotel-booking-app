import {  useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const SignoutBtn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      showToast({
        message: 'Signout successful',
        type: 'SUCCESS',
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const handleSignout = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleSignout}
      className='px-3 font-bold text-blue-600 bg-white hover:bg-gray-100'
    >
      Signout
    </button>
  );
};

export default SignoutBtn;
