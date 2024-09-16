import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole]=useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users',
    method: 'post',
    body: {
      email,
      password,
      role
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <select className="form-control" value={role} onChange={e=>setRole(e.target.value)}>
            <option value={""}>Please Select</option>
            <option value={"MANAGER"}>MANAGER</option>
            <option value={"USER"}>USER</option>
        </select>
      </div>
      {errors}
      <button className="btn btn-primary">Create</button>
    </form>
  );
};
