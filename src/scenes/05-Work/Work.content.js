// scenes/05-Work/Work.content.js
// Consistent with Architecture §2: Content isolated completely from structure.
// No bullet points, tech badges, or percentage charts per the Design Bible.

export const workContent = {
  eyebrow: '04 / ARCHITECTURE & AUTOMATION',
  headline: 'BUILT TO SCALE.',
  pillars: [
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'Engineering high-fidelity web ecosystems from database architecture to smooth frontend delivery. The focus is structural integrity, performance under load, and interfaces that feel completely fluid.'
    },
    {
      id: 'automation',
      title: 'AI Automation',
      description: 'Designing intelligent workflows that bridge data and decision-making. Developing autonomous agent pipelines and custom language model integrations that optimize complex operations into background execution.'
    },
    {
      id: 'software',
      title: 'Software Projects',
      description: 'Translating conceptual blueprints into tangible production code. Crafting complex system utilities, backend microservices, and bespoke software solutions where logic, speed, and design interface seamlessly.'
    }
  ]
};

export default workContent;