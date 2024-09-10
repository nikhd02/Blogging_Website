import { Children } from "react"
import { AnimatePresence, motion } from "framer-motion";
const AnimationWrapper = ({ Children, initial = { opacity: 0}, animate={opacity: 1}}) => {
    return (
        <motion.div
            initial={initial}
            animate={animate}
        >
            { Children }
        </motion.div>
    )
}

export default AnimationWrapper;