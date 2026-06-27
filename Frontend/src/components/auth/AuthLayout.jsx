import React from 'react';
import logo from '../../assets/logo.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-[390px] flex flex-col items-center gap-10">
        {/* Branding */}
        <div className="flex flex-col items-center gap-6">
          <img 
            src={logo} 
            alt="CineReserve Logo" 
            className="h-16 w-auto object-contain"
          />
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[28px] font-black text-slate-900 leading-tight">
              Creative Upaay
            </h1>
            <h1 className="text-[28px] font-black text-slate-900 leading-tight">
              Hiring Assignment
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
