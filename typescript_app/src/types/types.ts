import {
  Course,
  User,
  Account,
  Logs,
  Unit,
  Chapter,
  Question,
} from "@prisma/client";

export type UserWithRelations = User & {
  courses: Course[];
  accounts: Account[]; // Assuming Account is a type you have defined elsewhere
  followers: {
    follower: User & { courses: Course[] };
  }[];
  follows: {
    followed: User & { courses: Course[] };
  }[];
  signIns: Logs[]; // Assuming SignIn is a type you have defined elsewhere
};

export type Follower = {
  author: User & {
    followers: {
      follower: User & { courses: Course[] };
    }[];
  };
};

export type Follows = {
  author: User & {
    follows: {
      followed: User & { courses: Course[] };
    }[];
  };
};

export type AuthorCoursesFollows = {
  author: User & {
    courses: Course[];
    followers: {
      follower: User & { courses: Course[] };
    }[];
    follows: {
      followed: User & { courses: Course[] };
    }[];
  };

  session: any;
};

export type CourseWithUnits = Course & {
  units: (Unit & {
    chapters: Chapter[];
  })[];
};

export type CourseUserSession = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  user: User;
  session: any;
};

export type ChapterQuestionsRole = {
  chapter: Chapter & {
    questions: Question[];
  };
  session: any;
};

export type MainVideoType = {
  userId: string;
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};
