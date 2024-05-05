import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type SignupForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const mutation = useMutation(apiClient.signup, {
    onSuccess: () => {
      showToast({
        message: 'User created successfully',
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
      <h2 className='text-3xl font-bold'>Create an account</h2>
      <div className='flex flex-col gap-5 md:flex-row'>
        <label className='flex-1 text-sm font-bold text-grey-700'>
          First Name
          <input
            className='w-full px-2 py-1 font-normal border rounded'
            {...register('firstName', { required: 'This filed is required' })}
          />
          {errors.firstName && (
            <span className='text-red-500'>{errors.firstName.message}</span>
          )}
        </label>
        <label className='flex-1 text-sm font-bold text-grey-700'>
          Last Name
          <input
            className='w-full px-2 py-1 font-normal border rounded'
            {...register('lastName', { required: 'This filed is required' })}
          />
          {errors.lastName && (
            <span className='text-red-500'>{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className='flex-1 text-sm font-bold text-grey-700'>
        Confirm Password
        <input
          className='w-full px-2 py-1 font-normal border rounded'
          {...register('confirmPassword', {
            required: 'This filed is required',
            validate: (value) => {
              if (!value) return 'This field is required';
              if (watch('password') !== value)
                return 'Passwords does not match';
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type='submit'
          className='p-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-500'
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Signup;
