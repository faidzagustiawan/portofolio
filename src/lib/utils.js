import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// const useGA4 = () => {
//   const location = useLocation();
//   useEffect(() => {
//     // console.log(`GA4 Pageview Sent: ${location.pathname}`);
//     // Di real app: ReactGA.send({ hitType: "pageview", page: location.pathname });
//   }, [location]);
// };
// export default useGA4;