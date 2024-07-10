import {
  Course,
  PrismaClient,
  User,
  Unit,
  Chapter,
  Question,
  CourseComment,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tags = [
    "Программирование",
    "Веб-разработка",
    "Мобильная разработка",
    "Наука о данных",
    "Искусственный интеллект",
    "Машинное обучение",
    "Кибербезопасность",
    "Управление базами данных",
    "Программная инженерия",
    "Front-end разработка",
    "Back-end разработка",
    "Full-stack Разработка",
    "UI/UX дизайн",
    "Разработка игр",
    "Облачные вычисления",
    "DevOps",
    "Agile Development",
    "Управление проектами",
    "Управление продуктом",
    "Предпринимательство",
    "Маркетинг",
    "Финансы",
    "Бухгалтерия",
    "Стратегия бизнеса",
    "Лидерство",
    "Навыки общения",
    "Навыки презентации",
    "Навыки ведения переговоров",
    "Тайм-менеджмент",
    "Решение проблем",
    "Критическое мышление",
    "Работа в команде",
    "Сотрудничество",
    "Инновации",
    "Творчество",
    "Строительство",
    "Архитектура",
    "Гражданское строительство",
    "Электротехника",
    "Машиностроение",
    "Экологическая инженерия",
    "Структурная инженерия",
    "Проектирование зданий",
    "Строительные материалы",
    "Управление строительством",
    "Проектное планирование",
    "Управление безопасностью",
    "Контроль качества",
    "Строительные нормы и правила",
    "Устойчивое строительство",
    "Психология",
    "Религия",
    "Математика",
    "Физика",
    "Химия",
    "Биология",
    "Астрономия",
    "Спорт",
    "Культура",
    "Языки",
    "Музыка",
    "Танцы",
    "Книги",
  ];
  const enTags = [
    "Programming",
    "Web development",
    "Mobile development",
    "Data Science",
    "Artificial intelligence",
    "Machine learning",
    "Cybersecurity",
    "Database management",
    "Software Engineering",
    "Front-end development",
    "Back-end development",
    "Full-stack Development",
    "UI/UX design",
    "Game Development",
    "Cloud computing",
    "DevOps",
    "Agile Development",
    "Project management",
    "Product Management",
    "Entrepreneurship",
    "Marketing",
    "Finance",
    "Accounting",
    "Business Strategy",
    "Leadership",
    "Communication skills",
    "Presentation skills",
    "Negotiation skills",
    "Time management",
    "Problem solving",
    "Critical thinking",
    "Teamwork",
    "Cooperation",
    "Innovation",
    "Creation",
    "Construction",
    "Architecture",
    "Civil Engineering",
    "Electrical engineering",
    "Mechanical Engineering",
    "Environmental Engineering",
    "Structural Engineering",
    "Building Design",
    "Construction Materials",
    "Construction management",
    "Project planning",
    "Security Management",
    "Quality control",
    "Building regulations",
    "Sustainable Construction",
    "Psychology",
    "Religion",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Astronomy",
    "Sport",
    "Culture",
    "Languages",
    "Music",
    "Dancing",
    "Books",
  ];

  for (const tagName of tags) {
    const existingTag = await prisma.tags.findUnique({
      where: { name: tagName },
    });

    if (!existingTag) {
      await prisma.tags.create({
        data: {
          name: tagName,
          enName: enTags[tags.indexOf(tagName)],
        },
      });
      console.log(`Tag '${tagName}' seeded.`);
    } else {
      console.log(`Tag '${tagName}' already exists.`);
    }
  }

  if (process.env.NODE_ENV === "production") {
    return;
  }

  await prisma.user.createMany({
    data: [
      {
        name: "Alice44",
        email: "alice@example.com",
        bio: "I am Alice.",
      },
      { name: "Bob12", email: "bob@example.com", bio: "I am Bob." },
      {
        name: "Charlie346",
        email: "charlie@example.com",
        bio: "I am Charlie.",
      },
      { name: "David442", email: "david@example.com", bio: "I am David." },
      { name: "Eve465", email: "eve@example.com", bio: "I am Eve." },
    ],
    skipDuplicates: true,
  });

  const users: User[] = await prisma.user.findMany();

  await prisma.course.createMany({
    data: [
      {
        name: "Python Course",
        image: "https://i.imgur.com/yHQp9MB.png",
        totalDuration: 0,
        authorId: users[0].id,
      },
      {
        name: "Mathematics",
        image: "https://i.imgur.com/A6msUsJ.png",
        totalDuration: 0,
        authorId: users[1].id,
      },
      {
        name: "Infosec",
        image: "https://i.imgur.com/wXJbUNU.png",
        totalDuration: 0,
        authorId: users[1].id,
      },
      {
        name: "Physics",
        image: "https://i.imgur.com/H398vhW.png",
        totalDuration: 0,
        authorId: users[1].id,
      },
      {
        name: "Blog",
        image: "https://i.imgur.com/yatzcmU.png",
        totalDuration: 0,
        authorId: users[2].id,
      },
      {
        name: "Web Development",
        image: "https://i.imgur.com/zCWcXar.png",
        totalDuration: 0,
        authorId: users[3].id,
      },
      {
        name: "Transportaion",
        image: "https://i.imgur.com/xbQei0D.png",
        totalDuration: 0,
        authorId: users[4].id,
      },
    ],
  });

  const courses: Course[] = await prisma.course.findMany({
    where: {
      authorId: {
        in: [users[0].id, users[1].id, users[2].id, users[3].id, users[4].id],
      },
    },
  });

  await prisma.unit.createMany({
    data: [
      // Units for Python Course
      { name: "Functions", courseId: courses[0].id },
      { name: "Classes", courseId: courses[0].id },
      { name: "Modules", courseId: courses[0].id },

      // Units for Mathematics Course
      { name: "Algebra", courseId: courses[1].id },
      { name: "Calculus", courseId: courses[1].id },
      { name: "Geometry", courseId: courses[1].id },

      // Units for Infosec Course
      { name: "Network Security", courseId: courses[2].id },
      { name: "Cryptography", courseId: courses[2].id },
      { name: "Ethical Hacking", courseId: courses[2].id },

      // Units for Physics Course
      { name: "Mechanics", courseId: courses[3].id },
      { name: "Thermodynamics", courseId: courses[3].id },
      { name: "Electromagnetism", courseId: courses[3].id },

      // Units for Blog Course
      { name: "Writing Techniques", courseId: courses[4].id },
      { name: "Content Creation", courseId: courses[4].id },
      { name: "SEO Optimization", courseId: courses[4].id },

      // Units for Web 3 Course
      { name: "HTML5", courseId: courses[5].id },
      { name: "CSS3", courseId: courses[5].id },
      { name: "JavaScript", courseId: courses[5].id },

      // Units for Transportation Course
      { name: "Logistics", courseId: courses[6].id },
      { name: "Supply Chain Management", courseId: courses[6].id },
      { name: "Transportation Systems", courseId: courses[6].id },
    ],
  });

  const units: Unit[] = await prisma.unit.findMany({
    where: {
      courseId: {
        in: [
          courses[0].id,
          courses[1].id,
          courses[2].id,
          courses[3].id,
          courses[4].id,
          courses[5].id,
          courses[6].id,
        ],
      },
    },
  });

  await prisma.chapter.createMany({
    data: [
      {
        name: "Chapter 1",
        unitId: units[0].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[0].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[0].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[1].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[1].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[1].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },
      {
        name: "Chapter 1",
        unitId: units[2].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[2].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[2].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[3].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[3].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[3].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[4].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[4].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[4].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[5].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[5].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[5].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[6].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[6].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[6].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[7].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[7].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[7].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[8].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[8].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[8].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[9].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[9].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[9].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[10].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[10].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[10].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[11].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[11].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[11].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[12].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[12].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[12].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[13].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[13].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[13].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[14].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[14].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[14].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[15].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[15].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[15].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[16].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[16].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[16].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[17].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[17].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[17].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[18].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[18].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[18].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[19].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[19].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[19].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      {
        name: "Chapter 1",
        unitId: units[20].id,
        youtubeSearchQuery: "query1",
        videoId: "dQw4w9WgXcQ",
        summary: "summary1",
        duration: 0,
      },
      {
        name: "Chapter 2",
        unitId: units[20].id,
        youtubeSearchQuery: "query2",
        videoId: "dQw4w9WgXcQ",
        summary: "summary2",
        duration: 0,
      },
      {
        name: "Chapter 3",
        unitId: units[20].id,
        youtubeSearchQuery: "query3",
        videoId: "dQw4w9WgXcQ",
        summary: "summary3",
        duration: 0,
      },

      // Add more chapters as needed
    ],
  });

  // Seed questions

  await prisma.courseComment.createMany({
    data: [
      {
        messageText: "I love this course!",
        userId: users[0].id,
        courseId: courses[0].id,
      },
      {
        messageText: "Nice one!",
        userId: users[2].id,
        courseId: courses[0].id,
      },
      {
        messageText: "I love this course!",
        userId: users[1].id,
        courseId: courses[1].id,
      },
      {
        messageText: "Very interesting!",
        userId: users[2].id,
        courseId: courses[1].id,
      },
      {
        messageText: "I love this course!",
        userId: users[3].id,
        courseId: courses[2].id,
      },
      {
        messageText: "I love this course!",
        userId: users[4].id,
        courseId: courses[2].id,
      },
      {
        messageText: "I love this course!",
        userId: users[0].id,
        courseId: courses[3].id,
      },
      {
        messageText: "I love this course!",
        userId: users[1].id,
        courseId: courses[3].id,
      },
      {
        messageText: "I love this course!",
        userId: users[2].id,
        courseId: courses[2].id,
      },
      {
        messageText: "I love this course!",
        userId: users[3].id,
        courseId: courses[3].id,
      },
      {
        messageText: "I love this course!",
        userId: users[2].id,
        courseId: courses[4].id,
      },
      {
        messageText: "I love this course!",
        userId: users[4].id,
        courseId: courses[4].id,
      },
      {
        messageText: "I love this course!",
        userId: users[0].id,
        courseId: courses[5].id,
      },
      {
        messageText: "I love this course!",
        userId: users[1].id,
        courseId: courses[6].id,
      },
    ],
  });

  console.log("Tags seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
