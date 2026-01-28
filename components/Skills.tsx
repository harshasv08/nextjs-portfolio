'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'SQL', 'C', 'C++'],
  },
  {
    category: 'Frameworks',
    skills: ['FastAPI', 'Django', 'Flask', 'DRF', 'LangChain', 'LangGraph', 'React'],
  },
  {
    category: 'AI & Agents',
    skills: ['Agentic AI', 'LLM Workflows', 'AI Agents', 'A2A (Agent-to-Agent)'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'ClickHouse'],
  },
  {
    category: 'Cloud/DevOps',
    skills: ['AWS', 'GCP', 'Azure', 'Docker', 'Jenkins'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Nginx', 'Celery', 'RabbitMQ', 'Airflow', 'Playwright', 'Web3', 'Telegram Bot API'],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
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
            Technical <span className="text-accent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-primary p-6 rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <h3 className="text-xl font-heading font-bold mb-4 text-accent">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-4 py-2 bg-background-light text-text rounded-lg text-sm font-medium hover:bg-accent hover:text-background transition-all duration-200 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-primary p-8 md:p-12 rounded-xl"
        >
          <h3 className="text-3xl font-heading font-bold mb-6 text-center">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'AWS Cloud Practitioner (2025–28)',
              'Intro to MCP - Anthropic (2025)',
              'Python Full Stack (2024)',
              'Algorithms - IIT Bombay',
              'AWS Fundamentals',
              'GDPR Certified',
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-background-light p-4 rounded-lg text-center hover:bg-accent/20 transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-text font-medium text-sm">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
