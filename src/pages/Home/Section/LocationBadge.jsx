import { useState } from "react";

const LocationBadge = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute -left-6 md:-left-55 top-1/2 -translate-y-1/2 z-999">
      {/* DESKTOP = hover | MOBILE = tap */}
      <div
        className="group relative overflow-visible"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`
            flex items-center gap-3
            bg-gray-900/90 backdrop-blur-md
            text-white
            pl-10 md:pl-20 pr-4 py-2 md:py-3
            rounded-full
            border border-white/10

            transition-transform duration-1000 ease-out

            ${open ? "translate-x-0 md:translate-x-40" : "-translate-x-31 md:-translate-x-14"}
            xl:group-hover:translate-x-40
          `}
        >
          {/* TEXT */}
          <span
            className="
              text-xs md:text-xl
              leading-tight
              tracking-tight
              font-medium
              md:pr-5
              whitespace-normal md:whitespace-nowrap
            "
          >
            Located in Indonesia
          </span>

          {/* FLAG */}
          <div
            className="
              w-10 h-10 md:w-22 md:h-22
              rounded-full
              overflow-hidden
              border border-white/20
              flex flex-col
              shrink-0
            "
          >
            <div className="h-1/2 bg-red-600" />
            <div className="h-1/2 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBadge;
