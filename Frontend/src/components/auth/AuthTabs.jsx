import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthTabs = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-slate-100 p-1.5 rounded-xl w-full">
      <button
        type="button"
        onClick={() => navigate('/login')}
        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
          activeTab === 'login' 
            ? 'bg-white shadow-sm text-slate-900' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => navigate('/signup')}
        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
          activeTab === 'signup' 
            ? 'bg-white shadow-sm text-slate-900' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;
