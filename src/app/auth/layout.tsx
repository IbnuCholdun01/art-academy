import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FDFAF3] to-[#6f3823]">
        {children}
      </div>
    </Suspense>
  );
};

export default AuthLayout;
