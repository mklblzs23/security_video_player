import React, { ReactNode } from 'react'

type NavbarButtonProps = {
  children: ReactNode;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isLast?: boolean;
};

function NavbarButton(props: NavbarButtonProps) {
  const { children, isSelected, onClick, className, isLast } = props;

  return (
    <>
      <a className={`inline-block text-center rounded-2xl px-6 py-3.5 whitespace-no-wrap hover:bg-gray-200 hover:bg-opacity-20 transition-bg duration-700 ${!!isSelected && 'bg-gray-200 bg-opacity-20'} ${className}`} onClick={onClick}>
        {children}
      </a>
      {!isLast && <div className="bg-white h-auto w-px mx-2 my-4" />}
    </>
  );
}

export default NavbarButton;
