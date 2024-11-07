import React, { ReactNode } from "react";

type UniversalButtonProps = {
  onClick: () => void;
  customClass?: string;
  children: ReactNode;
};

const UniversalButton: React.FC<UniversalButtonProps> = ({
  onClick,
  customClass = "",
  children,
}) => {
  return (
    <button onClick={onClick} className={customClass}>
      {children}
    </button>
  );
};

export default UniversalButton;
