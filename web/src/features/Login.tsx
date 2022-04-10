import { useAuth } from "Providers";
import {Button} from "antd";
import {useState} from "react";


export function Login() {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  return (<div>
    <form onSubmit={() => signIn(form)}>
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
      <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
      <Button>Login</Button>
    </form>
  </div>)
}