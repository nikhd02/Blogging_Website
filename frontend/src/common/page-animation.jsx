import { Children } from "react"
import { AnimatePresence, motion } from "framer-motion";
const AnimationWrapper = ({ Children, keyValue, initial = { opacity: 0}, animate={opacity: 1}, transition = { duration: 1}, className }) => {
    return (
        <AnimatePresence>
            <motion.div
                key={keyValue}
                initial={initial}
                animate={animate}
                transition={transition}
                className={className}
            >
                { Children }
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper;