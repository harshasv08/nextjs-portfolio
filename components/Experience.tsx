'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

const experiences = [
  {
    company: 'Rokkun Systems Private Limited',
    role: 'Python Developer',
    period: 'Jan 2024 – Present',
    location: 'Remote',
    achievements: [
      'Developed and maintained 8+ production-grade backend applications using FastAPI, Django, PostgreSQL, AWS, and Redis, supporting 1000+ active users',
      'Designed and implemented AI-driven systems using LangChain and LangGraph, improving system performance and automation efficiency by 70–80%',
      'Improved platform engagement by 65% and reduced operational overhead by 60% through system optimization and intelligent automation',
    ],
  },
  {
    company: 'Company 2',
    role: 'Python Developer',
    period: 'May 2023 – Nov 2023',
    location: 'Remote',
    achievements: [
      'Built secure backend APIs using FastAPI and Django for security operations, log ingestion, incident processing, and compliance workflows',
    ],
  },
  {
    company: 'Company 3',
    role: 'Interface Engineer',
    period: 'Dec 2021 – Mar 2023',
    location: 'Remote',
    achievements: [
      'Maintained and enhanced healthcare data interfaces for clinical systems, ensuring reliable integration, migration, and interoperability across hospital platforms',
    ],
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Work <span className="text-accent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-light transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              // Company 1 (index 0): right, Company 2 (index 1): left, Company 3 (index 2): right
              const isRight = index === 0 || index === 2
              const isLeft = index === 1
              
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRight ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isRight ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full transform md:-translate-x-1/2 -translate-x-1/2 z-10" />

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ${
                    isRight ? 'md:pr-8 md:text-right' : 'md:pl-8'
                  }`}
                >
                  <motion.div
                    className="bg-primary p-6 rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-accent" />
                      </div>
                      <div className={isRight ? 'text-right md:order-first md:mr-auto md:ml-0' : ''}>
                        <h3 className="text-xl font-heading font-bold text-accent">{exp.role}</h3>
                        <p className="text-text font-semibold">{exp.company}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-text-muted text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-text-muted text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-accent mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
