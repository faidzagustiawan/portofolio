import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollRevealBlock = ({
    children,
    y = 80,
    scale = 0.96,
    blur = 10,
    duration = 1,
    className = ''
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial={{ opacity: 0, y, scale, filter: `blur(${blur}px)` }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollRevealBlock;
