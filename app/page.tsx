import Link from "next/link";

const Home = () => {
  return (
    <main className="flex flex-col h-screen">
      <header className="w-[90vw] lg:w-[75vw] flex items-center justify-between py-4 px-6 mt-6 lg:mt-10 mx-auto bg-neutral-900 bg-opacity-50 border-2 border-neutral-800 rounded-lg">
        <h2 className="text-xl font-bold">ChatCAM</h2>
        
        <nav className="flex items-center gap-2 ">
          <Link href={"/login"} className="py-2 px-5 text-semibold hover:bg-neutral-800 hover:bg-opacity-30 transition duration-300 rounded-lg">Login</Link>
          <Link href={"/sign-up"} className="py-2 px-5 text-semibold bg-neutral-800 rounded-lg border-2 border-neutral-700">Sign Up</Link>
        </nav>
      </header>

      <div className="flex flex-col h-full items-center justify-center gap-4 pb-20"> 
        <h1 className="text-3xl lg:text-6xl font-bold">ChatCAM</h1>
        <p className="w-[90vw] md:w-[420px] text-center">A Video Conferencing App, to connect to friends and family online, held official meetings and discussions and much more.</p>
        <Link href={"/sign-up"} className="text-lg py-3 px-6 text-semibold bg-neutral-900 rounded-lg border-2 border-neutral-800">Start a video chat</Link>
      </div>
    </main>
  );
}

export default Home;
