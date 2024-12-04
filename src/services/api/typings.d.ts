declare namespace API {
  type addCourseEnrollmentParams = {
    courseId: number;
  };

  type addDiscussionParams = {
    courseId: number;
  };

  type addStudyNoteParams = {
    courseId: number;
  };

  type Assignment = {
    /** 作业ID */
    assignmentId?: number;
    /** 课程ID */
    courseId: number;
    /** 作业标题 */
    title: string;
    /** 作业描述 */
    description: string;
    /** 截止时间 */
    deadline: string;
    /** 创建时间 */
    createTime: string;
  };

  type AssignmentFeedbackParam = {
    /** 提交ID */
    submissionId?: number;
    /** 得分 */
    score: number;
    /** 反馈内容 */
    feedback?: string;
  };

  type AssignmentQuery = {
    /** 作业ID */
    assignmentId?: number;
    /** 课程ID */
    courseId: number;
    /** 作业标题 */
    title: string;
    /** 作业描述 */
    description: string;
    /** 截止时间 */
    deadline: string;
    /** 创建时间 */
    createTime: string;
  };

  type AssignmentSubmissionCommitParam = {
    /** 提交内容 */
    content: string;
    /** 文件URL */
    fileUrl?: string;
  };

  type AssignmentSubmissionQuery = {
    /** 提交ID */
    submissionId?: number;
    /** 作业ID */
    assignmentId?: number;
    /** 学生ID */
    studentId?: number;
    /** 提交内容 */
    content?: string;
    /** 文件URL */
    fileUrl?: string;
    /** 状态：0-未提交、1-未批改、2-已批改 */
    status?: "0" | "1" | "2";
    /** 得分 */
    score?: number;
    /** 反馈内容 */
    feedback?: string;
    /** 提交时间 */
    submitTime?: string;
  };

  type AssignmentSubmissionVO = {
    /** 提交ID */
    submissionId?: number;
    /** 作业ID */
    assignmentId?: number;
    /** 学生ID */
    studentId?: number;
    /** 提交内容 */
    content?: string;
    /** 文件URL */
    fileUrl?: string;
    /** 状态：0-未提交、1-未批改、2-已批改 */
    status?: "0" | "1" | "2";
    /** 得分 */
    score?: number;
    /** 反馈内容 */
    feedback?: string;
    /** 提交时间 */
    submitTime?: string;
  };

  type AssignmentSubmitStatVO = {
    /** 未提交次数 */
    unCommittedCount?: number;
    /** 未批改次数 */
    unCorrectedCount?: number;
    /** 已批改次数 */
    correctedCount?: number;
    /** 总次数 */
    totalCount?: number;
  };

  type AssignmentVO = {
    /** 作业ID */
    assignmentId?: number;
    /** 课程ID */
    courseId: number;
    /** 作业标题 */
    title: string;
    /** 作业描述 */
    description: string;
    /** 截止时间 */
    deadline: string;
    /** 创建时间 */
    createTime: string;
    submitStat?: AssignmentSubmitStatVO;
  };

  type commitAssignmentSubmissionParams = {
    id: number;
  };

  type correctAssignmentSubmissionParams = {
    id: number;
  };

  type Course = {
    /** 课程ID */
    courseId?: number;
    /** 课程标题 */
    title?: string;
    /** 课程描述 */
    description?: string;
    /** 分类ID */
    categoryId?: number;
    /** 教师ID */
    teacherId?: number;
    /** 封面图片URL */
    coverImage?: string;
    /** 是否推荐 */
    isRecommended?: boolean;
    /** 课程状态：0-草稿、1-已发布、2-已归档 */
    status?: number;
    /** 是否允许评论 */
    allowComment?: boolean;
    /** 是否允许笔记 */
    allowNotes?: boolean;
    /** 浏览次数 */
    viewCount?: number;
    /** 点赞数 */
    likeCount?: number;
    /** 学生数量 */
    studentCount?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type CourseCarousel = {
    /** 轮播图ID */
    carouselId?: number;
    /** 课程ID */
    courseId?: number;
    /** 图片URL */
    imageUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 是否启用 */
    status?: boolean;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseCarouselQuery = {
    /** 轮播图ID */
    carouselId?: number;
    /** 课程ID */
    courseId?: number;
    /** 图片URL */
    imageUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 是否启用 */
    status?: boolean;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseCarouselVO = {
    /** 轮播图ID */
    carouselId?: number;
    /** 课程ID */
    courseId?: number;
    /** 图片URL */
    imageUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 是否启用 */
    status?: boolean;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseCategory = {
    /** 分类ID */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseCategoryQuery = {
    /** 分类ID */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseCategoryVO = {
    /** 分类ID */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseEnrollmentQuery = {
    /** 注册ID */
    enrollmentId?: number;
    /** 课程ID */
    courseId?: number;
    /** 学生ID */
    studentId?: number;
    /** 状态：0-进行中、1-已完成、2-已退出 */
    status?: "0" | "1" | "2";
    /** 学习进度 */
    progress?: number;
    /** 注册时间 */
    createTime?: string;
  };

  type CourseEnrollmentVO = {
    /** 注册ID */
    enrollmentId?: number;
    /** 课程ID */
    courseId?: number;
    /** 学生ID */
    studentId?: number;
    /** 状态：0-进行中、1-已完成、2-已退出 */
    status?: "0" | "1" | "2";
    /** 学习进度 */
    progress?: number;
    /** 注册时间 */
    createTime?: string;
  };

  type CourseMaterial = {
    /** 课件ID */
    materialId?: number;
    /** 课程ID */
    courseId?: number;
    /** 课件标题 */
    title?: string;
    /** 课件类型：0-文档、1-视频、2-音频、3-图片 */
    type?: number;
    /** 内容URL */
    contentUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseMaterialQuery = {
    /** 课件ID */
    materialId?: number;
    /** 课程ID */
    courseId?: number;
    /** 课件标题 */
    title?: string;
    /** 课件类型：0-文档、1-视频、2-音频、3-图片 */
    type?: number;
    /** 内容URL */
    contentUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseMaterialVO = {
    /** 课件ID */
    materialId?: number;
    /** 课程ID */
    courseId?: number;
    /** 课件标题 */
    title?: string;
    /** 课件类型：0-文档、1-视频、2-音频、3-图片 */
    type?: number;
    /** 内容URL */
    contentUrl?: string;
    /** 排序顺序 */
    sortOrder?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type CourseQuery = {
    /** 课程ID */
    courseId?: number;
    /** 课程标题 */
    title?: string;
    /** 课程描述 */
    description?: string;
    /** 分类ID */
    categoryId?: number;
    /** 教师ID */
    teacherId?: number;
    /** 封面图片URL */
    coverImage?: string;
    /** 是否推荐 */
    isRecommended?: boolean;
    /** 课程状态：0-草稿、1-已发布、2-已归档 */
    status?: number;
    /** 是否允许评论 */
    allowComment?: boolean;
    /** 是否允许笔记 */
    allowNotes?: boolean;
    /** 浏览次数 */
    viewCount?: number;
    /** 点赞数 */
    likeCount?: number;
    /** 学生数量 */
    studentCount?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    sorter?: Sorter;
  };

  type CourseVO = {
    /** 课程ID */
    courseId?: number;
    /** 课程标题 */
    title?: string;
    /** 课程描述 */
    description?: string;
    /** 分类ID */
    categoryId?: number;
    /** 教师ID */
    teacherId?: number;
    /** 封面图片URL */
    coverImage?: string;
    /** 是否推荐 */
    isRecommended?: boolean;
    /** 课程状态：0-草稿、1-已发布、2-已归档 */
    status?: number;
    /** 是否允许评论 */
    allowComment?: boolean;
    /** 是否允许笔记 */
    allowNotes?: boolean;
    /** 浏览次数 */
    viewCount?: number;
    /** 点赞数 */
    likeCount?: number;
    /** 学生数量 */
    studentCount?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    category?: CourseCategoryVO;
    teacher?: UserVO;
  };

  type deleteAssignmentParams = {
    id: number;
  };

  type deleteAssignmentSubmissionParams = {
    id: number;
  };

  type deleteCourseCarouselParams = {
    id: number;
  };

  type deleteCourseCategoryParams = {
    id: number;
  };

  type deleteCourseEnrollmentParams = {
    id: number;
  };

  type deleteCourseMaterialParams = {
    id: number;
  };

  type deleteCourseParams = {
    id: number;
  };

  type deleteDiscussionParams = {
    id: number;
  };

  type deleteQuestionBankParams = {
    id: number;
  };

  type deleteRoleParams = {
    id: number;
  };

  type deleteSelfTestParams = {
    id: number;
  };

  type deleteStudyNoteParams = {
    id: number;
  };

  type deleteTestRecordParams = {
    id: number;
  };

  type deleteUserParams = {
    id: number;
  };

  type Discussion = {
    /** 讨论ID */
    discussionId?: number;
    /** 课程ID */
    courseId?: number;
    /** 用户ID */
    userId?: number;
    /** 讨论内容 */
    content?: string;
    /** 父评论ID */
    parentId?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type DiscussionQuery = {
    /** 讨论ID */
    discussionId?: number;
    /** 课程ID */
    courseId?: number;
    /** 用户ID */
    userId?: number;
    /** 讨论内容 */
    content?: string;
    /** 父评论ID */
    parentId?: number;
    /** 创建时间 */
    createTime?: string;
  };

  type DiscussionVO = {
    /** 讨论ID */
    discussionId?: number;
    /** 课程ID */
    courseId?: number;
    /** 用户ID */
    userId?: number;
    /** 讨论内容 */
    content?: string;
    /** 父评论ID */
    parentId?: number;
    /** 创建时间 */
    createTime?: string;
    /** 子评论 */
    children?: Discussion[];
  };

  type enableDisableUserParams = {
    id: number;
  };

  type getAssignmentParams = {
    id: number;
  };

  type getAssignmentsParams = {
    current?: number;
    pageSize?: number;
    param: AssignmentQuery;
  };

  type getAssignmentSubmissionParams = {
    id: number;
  };

  type getAssignmentSubmissionsParams = {
    current?: number;
    pageSize?: number;
    param: AssignmentSubmissionQuery;
  };

  type getAssignmentSubmitStatParams = {
    param: AssignmentSubmissionQuery;
  };

  type getCourseAssignmentsParams = {
    id: number;
  };

  type getCourseCarouselParams = {
    id: number;
  };

  type getCourseCarouselsParams = {
    current?: number;
    pageSize?: number;
    param: CourseCarouselQuery;
  };

  type getCourseCategoryParams = {
    id: number;
  };

  type getCourseCategorysParams = {
    current?: number;
    pageSize?: number;
    param: CourseCategoryQuery;
  };

  type getCourseEnrollmentParams = {
    id: number;
  };

  type getCourseEnrollmentsParams = {
    current?: number;
    pageSize?: number;
    param: CourseEnrollmentQuery;
  };

  type getCourseMaterialParams = {
    id: number;
  };

  type getCourseMaterialsParams = {
    current?: number;
    pageSize?: number;
    param: CourseMaterialQuery;
  };

  type getCourseParams = {
    id: number;
  };

  type getCoursesParams = {
    current?: number;
    pageSize?: number;
    param: CourseQuery;
  };

  type getCourseStudentsParams = {
    id: number;
  };

  type getDiscussionParams = {
    id: number;
  };

  type getDiscussionsParams = {
    current?: number;
    pageSize?: number;
    param: DiscussionQuery;
  };

  type getMyDiscussionsParams = {
    current?: number;
    pageSize?: number;
    param: DiscussionQuery;
  };

  type getQuestionBankParams = {
    id: number;
  };

  type getQuestionBanksParams = {
    current?: number;
    pageSize?: number;
    param: QuestionBankQuery;
  };

  type getRoleParams = {
    id: number;
  };

  type getRolesParams = {
    current?: number;
    pageSize?: number;
    param: RoleQuery;
  };

  type getSelfTestParams = {
    id: number;
  };

  type getSelfTestsParams = {
    current?: number;
    pageSize?: number;
    param: SelfTestQuery;
  };

  type getStudyNoteParams = {
    id: number;
  };

  type getStudyNotesParams = {
    current?: number;
    pageSize?: number;
    param: StudyNoteQuery;
  };

  type getTestRecordParams = {
    id: number;
  };

  type getTestRecordsParams = {
    current?: number;
    pageSize?: number;
    param: TestRecordQuery;
  };

  type getUserParams = {
    id: number;
  };

  type getUsersParams = {
    current?: number;
    pageSize?: number;
    param: UserQuery;
  };

  type ListResultAssignmentSubmissionVO = {
    list?: AssignmentSubmissionVO[];
    total?: number;
  };

  type ListResultAssignmentVO = {
    list?: AssignmentVO[];
    total?: number;
  };

  type ListResultCourseCarouselVO = {
    list?: CourseCarouselVO[];
    total?: number;
  };

  type ListResultCourseCategoryVO = {
    list?: CourseCategoryVO[];
    total?: number;
  };

  type ListResultCourseEnrollmentVO = {
    list?: CourseEnrollmentVO[];
    total?: number;
  };

  type ListResultCourseMaterialVO = {
    list?: CourseMaterialVO[];
    total?: number;
  };

  type ListResultCourseVO = {
    list?: CourseVO[];
    total?: number;
  };

  type ListResultDiscussionVO = {
    list?: DiscussionVO[];
    total?: number;
  };

  type ListResultQuestionBankVO = {
    list?: QuestionBankVO[];
    total?: number;
  };

  type ListResultRoleVO = {
    list?: RoleVO[];
    total?: number;
  };

  type ListResultSelfTestVO = {
    list?: SelfTestVO[];
    total?: number;
  };

  type ListResultStudyNoteVO = {
    list?: StudyNoteVO[];
    total?: number;
  };

  type ListResultTestRecordVO = {
    list?: TestRecordVO[];
    total?: number;
  };

  type ListResultUserVO = {
    list?: UserVO[];
    total?: number;
  };

  type publishSelfTestParams = {
    id: number;
    courseId: number;
  };

  type QuestionBank = {
    /** 题目ID */
    questionId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 题目类型：0-单选、1-多选、2-判断、3-填空、4-问答 */
    type?: number;
    /** 题目内容 */
    questionText?: string;
    /** 选项JSON */
    options?: string;
    /** 正确答案 */
    correctAnswer?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type QuestionBankQuery = {
    /** 题目ID */
    questionId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 题目类型：0-单选、1-多选、2-判断、3-填空、4-问答 */
    type?: number;
    /** 题目内容 */
    questionText?: string;
    /** 选项JSON */
    options?: string;
    /** 正确答案 */
    correctAnswer?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type QuestionBankVO = {
    /** 题目ID */
    questionId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 题目类型：0-单选、1-多选、2-判断、3-填空、4-问答 */
    type?: number;
    /** 题目内容 */
    questionText?: string;
    /** 选项JSON */
    options?: string;
    /** 正确答案 */
    correctAnswer?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type quitCourseEnrollmentParams = {
    id: number;
  };

  type Role = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type RoleQuery = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type RoleVO = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type SelfTest = {
    /** 试卷ID */
    testId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 试卷标题 */
    title: string;
    /** 试卷说明 */
    description: string;
    /** 试卷设置JSON */
    settings?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SelfTestCreateParam = {
    /** 试卷ID */
    testId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 试卷标题 */
    title: string;
    /** 试卷说明 */
    description: string;
    /** 试卷设置JSON */
    settings?: string;
    /** 创建时间 */
    createTime?: string;
    /** 题目ID列表，题目顺序为列表顺序 */
    questionIds?: number[];
  };

  type SelfTestQuery = {
    /** 试卷ID */
    testId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 试卷标题 */
    title: string;
    /** 试卷说明 */
    description: string;
    /** 试卷设置JSON */
    settings?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type SelfTestVO = {
    /** 试卷ID */
    testId?: number;
    /** 创建者ID */
    creatorId?: number;
    /** 试卷标题 */
    title: string;
    /** 试卷说明 */
    description: string;
    /** 试卷设置JSON */
    settings?: string;
    /** 创建时间 */
    createTime?: string;
    /** 题目列表 */
    questions?: QuestionBank[];
  };

  type Sorter = {
    /** 排序字段 */
    column?: string;
    /** 排序方式 asc/desc */
    mode?: string;
    /** 是否自定义字段 */
    customField?: boolean;
  };

  type StudyNote = {
    /** 笔记ID */
    noteId?: number;
    /** 课程ID */
    courseId?: number;
    /** 学生ID */
    studentId?: number;
    /** 笔记内容 */
    content?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type StudyNoteQuery = {
    /** 笔记ID */
    noteId?: number;
    /** 课程ID */
    courseId?: number;
    /** 学生ID */
    studentId?: number;
    /** 笔记内容 */
    content?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type StudyNoteVO = {
    /** 笔记ID */
    noteId?: number;
    /** 课程ID */
    courseId?: number;
    /** 学生ID */
    studentId?: number;
    /** 笔记内容 */
    content?: string;
    /** 创建时间 */
    createTime?: string;
  };

  type TestRecord = {
    /** 记录ID */
    recordId?: number;
    /** 试卷id */
    testId?: number;
    /** 学生ID */
    studentId?: number;
    /** 测试状态 */
    status?: "0" | "1";
    /** 答案JSON */
    answers?: string;
    /** 得分 */
    score?: number;
    /** 完成时间 */
    completeTime?: string;
  };

  type TestRecordCommitParam = {
    /** 记录ID */
    recordId?: number;
    /** 学生ID */
    studentId?: number;
    /** 答案JSON */
    answers?: string;
  };

  type TestRecordQuery = {
    /** 记录ID */
    recordId?: number;
    /** 试卷id */
    testId?: number;
    /** 学生ID */
    studentId?: number;
    /** 测试状态 */
    status?: "0" | "1";
    /** 答案JSON */
    answers?: string;
    /** 得分 */
    score?: number;
    /** 完成时间 */
    completeTime?: string;
  };

  type TestRecordVO = {
    /** 记录ID */
    recordId?: number;
    /** 试卷id */
    testId?: number;
    /** 学生ID */
    studentId?: number;
    /** 测试状态 */
    status?: "0" | "1";
    /** 答案JSON */
    answers?: string;
    /** 得分 */
    score?: number;
    /** 完成时间 */
    completeTime?: string;
  };

  type updateAssignmentParams = {
    id: number;
  };

  type updateCourseCarouselParams = {
    id: number;
  };

  type updateCourseCategoryParams = {
    id: number;
  };

  type updateCourseMaterialParams = {
    id: number;
  };

  type updateCourseParams = {
    id: number;
  };

  type updateDiscussionParams = {
    id: number;
  };

  type updateQuestionBankParams = {
    id: number;
  };

  type updateRoleParams = {
    id: number;
  };

  type updateSelfTestParams = {
    id: number;
  };

  type updateStudyNoteParams = {
    id: number;
  };

  type updateTestRecordParams = {
    id: number;
  };

  type updateUserParams = {
    id: number;
  };

  type UserAuthVO = {
    /** 用户ID */
    token?: string;
  };

  type UserForm = {
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username: string;
    /** 邮箱 */
    email?: string;
    /** 学号 */
    studentId?: string;
    /** 昵称 */
    nickname?: string;
    /** 头像URL */
    avatarUrl?: string;
    /** 个性签名 */
    signature?: string;
    /** 性别 */
    gender?: "0" | "1" | "2";
    password?: string;
    /** 管理员有效！！！用户角色id */
    roleIds?: number[];
  };

  type UserLoginPasswordParam = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type UserPasswordParam = {
    /** 用户ID */
    userId: number;
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type UserQuery = {
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 密码盐值 */
    salt?: string;
    /** 邮箱 */
    email?: string;
    /** 学号 */
    studentId?: string;
    /** 昵称 */
    nickname?: string;
    /** 头像URL */
    avatarUrl?: string;
    /** 性别 0 未知 1 男  2 女 */
    gender?: "0" | "1" | "2";
    /** 个性签名 */
    signature?: string;
    /** 账号状态：0-启用、1-禁用 */
    status?: "0" | "1";
    /** 登录尝试次数 */
    loginAttempts?: number;
    /** 最后登录时间 */
    lastLoginTime?: string;
    /** 最后登录IP */
    lastLoginIp?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type UserResetPasswordParam = {
    /** 用户ID */
    userId: number;
    /** 新密码 */
    newPassword: string;
  };

  type UserVO = {
    /** 用户ID */
    userId?: number;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 密码盐值 */
    salt?: string;
    /** 邮箱 */
    email?: string;
    /** 学号 */
    studentId?: string;
    /** 昵称 */
    nickname?: string;
    /** 头像URL */
    avatarUrl?: string;
    /** 性别 0 未知 1 男  2 女 */
    gender?: "0" | "1" | "2";
    /** 个性签名 */
    signature?: string;
    /** 账号状态：0-启用、1-禁用 */
    status?: "0" | "1";
    /** 登录尝试次数 */
    loginAttempts?: number;
    /** 最后登录时间 */
    lastLoginTime?: string;
    /** 最后登录IP */
    lastLoginIp?: string;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    roles?: Role[];
  };

  type viewFileParams = {
    filename: string;
  };

  type viewImageParams = {
    filename: string;
  };
}
