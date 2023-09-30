import React from "react";

function Home() {
  return (
    <div>
      <header className="py-12 text-white bg-blue-900">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-4xl font-semibold">Welcome to Your App</h1>
          <p className="text-lg">Discover amazing features of your app here.</p>
        </div>
      </header>

      <main className="container py-8 mx-auto">
        {/* Your main content goes here */}
        <p>This is the main content of your home page.</p>
      </main>
    </div>
  );
}

export default Home;
