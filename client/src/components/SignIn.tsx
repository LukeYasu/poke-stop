import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './useUser';

type AuthData = {
  user: User;
  token: string;
};
type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

export function SignIn() {
  const { handleSignIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData);
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
      navigate('/');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="page-container">
        <h2 className="text-xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap mb-1">
            <div className="w-1/2">
              <label className="mb-1 block">
                Username
                <input
                  required
                  name="username"
                  type="text"
                  className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                />
              </label>
              <label className="mb-1 block">
                Password
                <input
                  required
                  name="password"
                  type="password"
                  className="block border border-gray-600 rounded p-2 h-8 w-full mb-2"
                />
              </label>
            </div>
          </div>
          <button
            disabled={isLoading}
            className="align-middle text-center border rounded py-1 px-3 bg-blue-600 text-white">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
