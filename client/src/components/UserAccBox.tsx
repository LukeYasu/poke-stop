import { Link } from 'react-router-dom';
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

export function UserAccBox() {
  const { handleSignIn } = useUser();

  async function handleGuest() {
    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', password: 'guest' }),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = (await res.json()) as AuthData;
      handleSignIn(user, token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
  }

  function handleSignOut() {
    window.location.reload();
  }
  const { toggleUserBox, userBoxOpen, user } = useUser();
  if (user) {
    return (
      <div className={userBoxOpen ? '' : 'hidden'}>
        <div className="user-login-ref">
          <div className="logged-in-box flex justify-center flex-col rounded">
            <div className="flex w-full justify-between">
              <div className="text-lg m-2 text-white">
                Logged in as: {user?.username}
              </div>
              <button
                onClick={toggleUserBox}
                className="border-2 border-slate-400 w-7 h-7 text-base rounded m-2 bg-slate-300 text-white">
                X
              </button>
            </div>
            <button
              onClick={handleSignOut}
              className="border-slate-400 border-2 rounded h-8 text-white text-lg bg-slate-300 pl-1 pr-1 m-2">
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={userBoxOpen ? '' : 'hidden'}>
      <div className="user-login-ref">
        <div className="user-login flex flex-wrap w-48 rounded">
          <div className="w-full flex justify-end">
            <button
              onClick={toggleUserBox}
              className="border-2 border-slate-400 w-7 h-7 text-base rounded m-1 bg-slate-300 text-white">
              X
            </button>
          </div>
          <div className="flex w-full justify-between p-1">
            <Link
              onClick={toggleUserBox}
              to="sign-in"
              className="border-slate-400 border-2 rounded h-8 text-white text-lg bg-slate-300 pl-1 pr-1">
              <div>user login</div>
            </Link>
            <Link
              onClick={toggleUserBox}
              to="sign-up"
              className="border-slate-400 border-2 rounded h-8 text-white text-lg bg-slate-300 pl-1 pr-1">
              <div>Register</div>
            </Link>
          </div>
          <div
            onClick={handleGuest}
            className="text-sm w-full flex justify-center mb-1 text-slate-200 underline cursor-pointer hover:text-blue-600">
            Sign in as guest
          </div>
        </div>
      </div>
    </div>
  );
}
