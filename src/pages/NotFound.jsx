import ScrollRevealBlock from "@/components/Animation/ScrollRevealBlock"
import Magnet from '@/components/Animation/Magnet'

const NotFound = () => {
  return (
    <main className="bg-black text-white min-h-screen overflow-hidden">

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">


        <p className="         text-[8rem] md:text-[14rem] xl:text-[18rem]
            font-medium
            leading-none
            text-white/90">
          404
        </p>

        {/* MESSAGE */}
        <ScrollRevealBlock
          y={40}
          blur={8}
          scale={0.95}
          start="top 90%"
          className="mt-10"
        >
          <p className="text-lg md:text-xl text-white/70 max-w-xl">
            The page you’re looking for doesn’t exist.
            or maybe it was never meant to be found.
          </p>
        </ScrollRevealBlock>

        {/* CTA */}
        <ScrollRevealBlock
          y={30}
          blur={6}
          scale={0.95}
          start="top 95%"
          className="mt-14"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Magnet padding={1500} magnetStrength={10}>
              <a
                href="/"
                className="
                  inline-flex items-center gap-2
                  px-8 py-4
                  rounded-full
                  bg-white
                  text-black
                  text-base md:text-lg
                  font-medium
                  hover:bg-gray-900 hover:text-white
                  transition-colors duration-300
                "
              >
                Go Home →
              </a>
            </Magnet>


          </div>
        </ScrollRevealBlock>

      </section>

    </main>
  )
}

export default NotFound
