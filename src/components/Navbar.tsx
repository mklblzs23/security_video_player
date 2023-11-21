import { ReactNode } from 'react';

type NavbarProps = {
  children: ReactNode;
  className: string;
};

function Navbar(props: NavbarProps) {
  const { children, className } = props;

  return (
    <nav className={`flex border border-solid fixed rounded-3xl p-2 transition-all duration-700 overflow-visible ${className}`}>
      {children}
    </nav>
  );
}

export default Navbar;
