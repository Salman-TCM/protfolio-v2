'use client'

import { motion } from 'framer-motion'

const SocialLinks = () => {
  const socialLinks = [
    {
      label: 'GitHub',
      url: 'https://github.com/Salman-TCM',
      icon: '◈',
      shortcut: 'G',
      isExternal: true,
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/salmanhossainbd/',
      icon: '◯',
      shortcut: 'L',
      isExternal: true,
    },
    {
      label: 'LeetCode',
      url: 'https://leetcode.com/SalmanTCM',
      icon: '◫',
      shortcut: 'C',
      isExternal: true,
    },
    {
      label: 'Download CV',
      url: '/salman_hossain_cv.pdf',
      icon: '⬇',
      shortcut: 'D',
      isExternal: false,
    },
  ]

  return (
    <div className="fixed bottom-6 sm:bottom-8 md:bottom-8 right-2 sm:right-4 md:right-6 z-40 
                flex flex-row md:flex-col items-center gap-2 sm:gap-3 md:gap-4">
  {socialLinks.map((social, index) => (
    <motion.a
      key={social.label}
      href={social.url}
      {...(social.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { download: true })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-10 h-10 sm:w-8 md:w-8 lg:w-10 bg-black text-white flex items-center justify-center 
                 text-xs sm:text-sm md:text-base lg:text-xl hover:bg-white hover:text-black 
                 transition-all group relative border border-white/20"
      title={social.label}
    >
      <span className="text-sm sm:text-base md:text-lg lg:text-xl">{social.icon}</span>
      
      {/* Tooltip - Hidden on mobile, visible on larger screens */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: -5 }}
        className="absolute right-8 sm:right-12 md:right-16 bg-black text-white text-xs px-2 py-1 rounded 
                   whitespace-nowrap font-mono pointer-events-none hidden sm:block border border-white/20"
      >
        {social.label}
      </motion.div>
    </motion.a>
  ))}
</div>


  )
}

export default SocialLinks
