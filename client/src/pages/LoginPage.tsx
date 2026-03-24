import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Ticker from '../features/auth/components/Ticker';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../features/auth/hooks/useAuth';

const ITEMS = [
  'Real-time collaboration',
  'Channels & boards',
  'Role-based access',
  'Instant messaging',
  'Sprint planning',
  'Team spaces',
];

interface Inputs {
  identifier: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync: login, isPending, isError, error } = useLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data);
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto">
        <aside className="p-6 md:px-10 md:py-12 border-b-2 border-border md:h-screen md:flex md:flex-col md:justify-between md:border-r md:pb-12 relative overflow-y-hidden">
          <div className="flex font-display items-center gap-3">
            <div className="w-9 h-9 bg-accent flex items-center justify-center text-xl">
              K
            </div>
            <p className="text-white font-mono font-extrabold tracking-widest text-sm">
              KODO
            </p>
          </div>
          <div className="font-display text-text mt-5 text-[2.6rem] md:text-[3.8rem] leading-none z-20">
            <p>WHERE TEAMS</p>
            <p>FIND THEIR</p>
            <p className="text-accent">RHYTHM.</p>
            <div className="font-mono text-muted text-xs mt-4">
              <p>Channels. Boards. Real-time</p>
              <p>Everything moven into one.</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-10 mt-6 gap-3 z-20">
            <div className="border-r border-border">
              <p className="text-text font-display text-2xl">12</p>
              <p className="text-muted uppercase text-xs mt-1">k+ teams</p>
            </div>
            <div className="border-r border-border">
              <p className="text-text font-display text-2xl">99</p>
              <p className="text-muted uppercase text-xs mt-1">% uptime</p>
            </div>
            <div>
              <p className="text-text font-display text-2xl">4</p>
              <p className="text-muted uppercase text-xs mt-1">.9 rating</p>
            </div>
          </div>
          <div className="hidden md:flex flex-col absolute -bottom-4 -left-2 text-surf font-display pointer-events-none select-none">
            <p className="text-[220px] leading-[0.85] tracking-tight">KODO</p>
            <p className="text-[220px] leading-[0.85] tracking-tight">KODO</p>
          </div>
        </aside>
        <section
          aria-label="Sign in"
          className="p-6 md:px-14 md:py-16 md:h-screen md:flex md:flex-col md:justify-center"
        >
          <div>
            <div className="flex gap-2.5 font-mono text-muted items-center mb-2">
              <div className="w-6 h-px bg-accent" />
              <p className="text-[0.7rem] tracking-wider">SIGN IN</p>
            </div>
            <div className="pb-8 font-display text-[2.6rem] md:text-[5rem] text-white leading-none border-b border-border md:max-w-100">
              <p>WELCOME</p>
              <p>BACK.</p>
            </div>
          </div>
          <form className="pt-4 md:max-w-100" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Identifier"
              placeholder="email or username"
              id="identifier"
              type="text"
              {...register('identifier', { required: 'Required' })}
              error={errors.identifier?.message}
            />
            <Input
              label="Password"
              placeholder="*********"
              id="password"
              type="password"
              {...register('password', { required: 'Required' })}
              error={errors.password?.message}
            />
            <div className="md:flex gap-4">
              <Button
                type="submit"
                variant="primary"
                text={isPending ? 'Signing in...' : 'Sign in →'}
                disabled={isPending}
              />
              {isError && (
                <p className="font-mono text-xs text-red mt-2">
                  {error.message}
                </p>
              )}
              <p className="font-mono text-muted text-xs mt-4">
                No account?{' '}
                <a
                  href="/register"
                  className="text-white underline underline-offset-4"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </section>
      </div>
      <Ticker items={ITEMS} />
    </main>
  );
}
