import Image from "next/image";



export default async function Home() {

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">BDRESS</h1>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image
                src="https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xvdGhpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Product"
                width={350}
                height={300}
                unoptimized
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to BDress! On this site you can either be the seller or
              someone who is interested in our Products. This Website specialize
              in selling Clothing including footwear and accessoires.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
