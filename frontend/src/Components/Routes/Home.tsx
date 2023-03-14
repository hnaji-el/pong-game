import React, { useEffect,createContext } from "react";
import Navigation from "../Navigation/Navigation";
import fire from "../../assets/fire.png"

export const ActiveHome = createContext<boolean>(false)

export default function Home() {
  useEffect(() => {
    document.title = "Pong - Home";
  }, []);

  return(
    <ActiveHome.Provider value={true}>
      <Navigation />
      <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
      <div className='flex flex-col gap-5 w-full h-full'>
        <h1 className='text-primaryText text-2xl flex items-center gap-1.5'><span>Live Games</span><img src={fire} alt="fire" className='w-4' /></h1>
        <section className='flex flex-col gap-6 lg:flex-row lg:items-start'>
        </section>
      </div>
    </main>
    </ActiveHome.Provider>
  );
}
