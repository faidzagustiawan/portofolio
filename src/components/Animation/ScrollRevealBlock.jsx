import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealBlock = ({
    children,
    scrollContainerRef,
    start = 'top bottom-=10%',
    end = '+=60%',
    y = 80,
    scale = 0.96,
    blur = 10,
    duration = 1,
    className = ''
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const scroller =
            scrollContainerRef?.current ? scrollContainerRef.current : window;

        gsap.set(el, {
            opacity: 0,
            y,
            scale,
            filter: `blur(${blur}px)`
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scroller,
                start,
                end,
                scrub: 0.5
            }
        });

        // REVEAL IN
        tl.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
            duration
        })

        return () => {
            ScrollTrigger.getAll()
                .filter(t => t.trigger === el)
                .forEach(t => t.kill());
        };
    }, [scrollContainerRef, start, end, y, scale, blur, duration]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default ScrollRevealBlock;
