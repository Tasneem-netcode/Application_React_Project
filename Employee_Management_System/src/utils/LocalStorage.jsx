const employees = [
  {
    id: 1,
    name: "Ayaan Khan",
    email: "ayaan@example.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        title: "Design Landing Page",
        description: "Create responsive landing page UI",
        date: "2026-02-25",
        category: "Design",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        title: "Fix Navbar UI",
        description: "Correct alignment issues",
        date: "2026-02-24",
        category: "Frontend",
        newTask: false,
        active: true,
        completed: false,
        failed: false
      }
    ]
  },

  {
    id: 2,
    name: "Sara Ali",
    email: "sara@example.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        title: "Fix Login Bug",
        description: "Resolve authentication issue",
        date: "2026-02-23",
        category: "Backend",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        title: "API Testing",
        description: "Test all endpoints",
        date: "2026-02-20",
        category: "Testing",
        newTask: false,
        active: false,
        completed: false,
        failed: true
      }
    ]
  },

  {
    id: 3,
    name: "Zaid Ahmed",
    email: "zaid@example.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        title: "Database Optimization",
        description: "Improve query performance",
        date: "2026-02-28",
        category: "Backend",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        title: "Deploy App",
        description: "Deploy to production",
        date: "2026-02-15",
        category: "DevOps",
        newTask: false,
        active: false,
        completed: true,
        failed: false
      }
    ]
  },

  {
    id: 4,
    name: "Fatima Noor",
    email: "fatima@example.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        title: "Create Wireframes",
        description: "Design basic app wireframes",
        date: "2026-02-26",
        category: "Design",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        title: "Client Meeting",
        description: "Discuss project requirements",
        date: "2026-02-19",
        category: "Management",
        newTask: false,
        active: true,
        completed: false,
        failed: false
      }
    ]
  },

  {
    id: 5,
    name: "Omar Farooq",
    email: "omar@example.com",
    password: "123",
    role: "employee",
    tasks: [
      {
        title: "Setup CI/CD",
        description: "Configure GitHub Actions",
        date: "2026-02-27",
        category: "DevOps",
        newTask: true,
        active: false,
        completed: false,
        failed: false
      },
      {
        title: "Security Audit",
        description: "Check vulnerabilities",
        date: "2026-02-18",
        category: "Security",
        newTask: false,
        active: false,
        completed: true,
        failed: false
      }
    ]
  }
]

const admin = [
  {
    id: 99,
    name: "Admin User",
    email: "admin@example.com",
    password: "123",
    role: "admin"
  }
];

export const setLocalStorage = () => {
    // Only seed data if it doesn't already exist in localStorage
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(employees))
    }
    if (!localStorage.getItem('admin')) {
        localStorage.setItem('admin', JSON.stringify(admin))
    }
}

export const getLocalStorage = () => {
    return {
        employees: JSON.parse(localStorage.getItem('employees')),
        admin: JSON.parse(localStorage.getItem('admin'))
    }
}