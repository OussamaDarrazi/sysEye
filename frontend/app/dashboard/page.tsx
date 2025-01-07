import { Navbar } from "../../components/Navbar";
import grid from "../../public/Grid.png";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${grid.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1728"
        height="1180"
        viewBox="0 0 1728 1180"
        fill="currentColor"
        className="absolute w-full max-h-screen -top-72 pointer-events-none opacity-60"
      >
        {/* SVG content */}
      </svg>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-16 flex gap-6">
          {/* Sidebar */}
          <aside className="w-1/4 min-h-[80vh] bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-4 flex flex-col space-y-4">
            {/* Search Bar */}
            <div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* List */}
            <ul className="flex-grow space-y-2 overflow-y-auto">
              {["Node 1", "Node 2", "Node 3", "Node 4", "Node 5"].map(
                (node, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-all"
                  >
                    {node}
                  </li>
                )
              )}
            </ul>
          </aside>

          {/* Main Content */}
          <section className="flex-grow bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-lg flex items-center justify-center">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Choose a Node
            </h2>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Page;
