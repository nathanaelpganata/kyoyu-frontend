import clsxm from '@/lib/clsxm';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type InputProps = {
  label: string;
  id: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  helperText?: string;
  inputClassName?: string;
  readonly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  id,
  type = 'text',
  helperText,
  inputClassName,
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='flex flex-col flex-grow'>
      <label htmlFor={id}>{label}</label>
      <input
        {...register(id, validation)}
        {...rest}
        id={id}
        name={id}
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-describedby={id}
        className={clsxm(
          readOnly
            ? 'bg-gray-500 cursor-not-allowed border-none focus:ring-0'
            : error
            ? 'bg-red-200 focus:ring-red-500 border-red-500 focus:border-red-500'
            : 'bg-white focus:ring-blue-500 border-gray-300 focus:border-blue-500',
          'outline-none rounded-md px-2 py-1.5 border-2 mt-1',
          inputClassName,
        )}
      />
      {/* Helper or Error */}
      <div className='mt-1'>
        {helperText && <p className='text-xs text-neutral-500'>{helperText}</p>}
        {!hideError && error && (
          <span className='flex text-sm text-red-500 gap-x-1'>
            <HiExclamationCircle className='text-xl text-red-500' />
            {error?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
