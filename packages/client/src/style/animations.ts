export const layoutContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
      delayChildren: 0.4
    }
  },
  exit: { opacity: 0 }
}
