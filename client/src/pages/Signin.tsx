import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type SigninFormData = {
  email: string;
  password: string;
};

const Signin = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      await queryClient.invalidateQueries();

      showToast({
        message: 'User signed in successful',
        type: 'SUCCESS',
      });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Sign In</h2>
      <label className='flex-1 text-sm font-bold text-grey-700'>
        Email
        <input
          className='w-full px-2 py-1 font-normal border rounded'
          {...register('email', { required: 'This filed is required' })}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='flex-1 text-sm font-bold text-grey-700'>
        Password
        <input
          className='w-full px-2 py-1 font-normal border rounded'
          {...register('password', {
            required: 'This filed is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Don't have an account? <Link className='font-bold underline' to='/sign-up'>Sign up</Link>
        </span>
        <button
          type='submit'
          className='p-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-500'
        >
          Sign in
        </button>
      </span>
    </form>
  );
};

export default Signin;
