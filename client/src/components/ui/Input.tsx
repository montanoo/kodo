import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col mb-2 text-muted">
        <label htmlFor={id} className="font-mono text-xs uppercase mb-2">
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className="border-0 outline-0 pb-4 text-sm bg-bg text-text caret-accent"
          {...rest}
        />
        {error && <p className="font-mono text-xs text-red mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
