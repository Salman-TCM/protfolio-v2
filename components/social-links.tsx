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
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3 sm:gap-4">
      {socialLinks.map((social, index) => (
        social.isExternal ? (
          <motion.a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-black text-white flex items-center justify-center text-lg sm:text-xl hover:bg-white hover:text-black transition-all group relative"
            title={`Visit ${social.label}`}
          >
            <span className="text-xl">{social.icon}</span>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: -5 }}
              className="absolute right-16 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap font-mono pointer-events-none hidden sm:block border border-white/20"
            >
              {social.label}
            </motion.div>
          </motion.a>
        ) : (
          <motion.a
            key={social.label}
            href={social.url}
            download
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-black text-white flex items-center justify-center text-lg sm:text-xl hover:bg-white hover:text-black transition-all group relative"
            title={social.label}
          >
            <span className="text-xl">{social.icon}</span>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: -5 }}
              className="absolute right-16 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap font-mono pointer-events-none hidden sm:block border border-white/20"
            >
              {social.label}
            </motion.div>
          </motion.a>
        )
      ))}
    </div>
  )
}

export default SocialLinks
