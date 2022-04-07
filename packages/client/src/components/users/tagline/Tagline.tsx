import { motion } from 'framer-motion'

export default function Tagline() {
  return (
    <motion.h6
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.6, 0.66, 0.04, 1] } }}
      exit={{ opacity: 0, y: 16, transition: { duration: 0.3, ease: [0.6, 0.66, 0.04, 1] } }}
      className='z-0 auto-rows-auto self-center pb-3 text-2xl font-semibold text-white-50'>
      Current User List
    </motion.h6>
  )
}
