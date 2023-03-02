import React,{useEffect} from "react";
interface TypeProps {
  children: JSX.Element | JSX.Element[] | string;
}
export default function ModalSearch({ children }: TypeProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <div className="absolute left-0 top-0 flex justify-center px-3 pt-7 lg:items-start bg-black/30 w-full h-full backdrop-blur-sm lg:hidden">
      {children}
    </div>
  );
}
