
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { PREVIEW_SIZE } from '@/data/projects'

export function FloatingPreview({ activeIndex, cursorX, cursorY, intent, projects }) {
    if (activeIndex === null) return null

    return createPortal(
        <motion.div
            className="fixed pointer-events-none"
            style={{
                left: 0,
                top: 0,
                width: PREVIEW_SIZE,
                height: PREVIEW_SIZE,
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                zIndex: 9999,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
        >
            <motion.div
                className="w-full h-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"
                animate={{
                    borderRadius: `${24 - intent * 20}px`,
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    animate={{
                        y: -activeIndex * PREVIEW_SIZE,
                    }}
                    transition={{
                        duration: 0.9 - intent * 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {projects.map((p, i) => (
                        <img
                            key={i}
                            src={p.image}
                            alt={p.name}
                            className="w-full h-[400px] object-cover"
                            draggable={false}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>,
        document.body
    )
}
