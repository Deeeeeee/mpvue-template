import fly from '@/utils/fly'

/* 我的学习课程详情 */
export const coursePersonInfo = coursePersonId =>
  fly.post('/newtrain/api/organize/app/coursePerson/info',
    {
      coursePersonId
    }
  )
/* 课程讲师列表 */
export const coursePersonTeacherList = coursePersonId =>
  fly.post('/newtrain/api/organize/app/coursePerson/lecturerList',
    {
      coursePersonId
    }
  )

/* 课时详情 */
export const coursePersonLessonInfo = classHourId =>
  fly.post('/newtrain/api/organize/app/coursePerson/lessonInfo',
    {
      classHourId
    }
  )

/* 课时资料 */
export const lessonInfoMaterial = materialId =>
  fly.post('/puzzle/api/organize/app/material/info',
    {
      materialId
    }
  )

/* 课时学习 */
export const lessonLearn = classHourId =>
  fly.post('/newtrain/api/organize/app/coursePerson/learn',
    {
      classHourId
    }
  )

/* 线下课详情 */
export const underlineInfo = classHourId =>
  fly.post('/newtrain/api/organize/app/coursePerson/educationLessonInfo',
    {
      classHourId
    }
  )

/* 试卷详情 */
export const examInfo = data =>
  fly.post('/puzzle/api/organize/app/paper/info',
    data
  )

/*开始考试 */
export const examStart = data =>
  fly.post('/puzzle/api/organize/app/answer/paper/lesson/start',
    data
  )

/*交卷 */
export const submitExam = data =>
  fly.post('/puzzle/api/organize/app/answer/paper/result',
    data
  )

/*考试详情 */
export const examAnalyze = answerPaperId =>
  fly.post('/puzzle/api/organize/app/answer/paper/info',
    {
      answerPaperId
    }
  )

/* 作业详情 */
export const homeworkInfo = homeworkId =>
  fly.post('/puzzle/api/organize/app/homework/info',
    {
      homeworkId
    }
  )

/* 提交作业 */
export const homeworkSubmit = data =>
  fly.post('/puzzle/api/organize/app/homework/submit',
    data
  )

/*教具课时详情 */
export const realiaInfo = realiaMatterId =>
  fly.post('/puzzle/api/organize/app/realiaMatter/info',
    {
      realiaMatterId
    }
  )

/* 教师提交实操视频 */
export const guideVideoSubmit = data =>
  fly.post('/puzzle/api/organize/app/realiaVideo/edit',
    data
  )

/*实操详情 */
export const guideInfo = realiaVideoId =>
  fly.post('/puzzle/api/organize/app/realiaVideo/info',
    {
      realiaVideoId
    }
  )

// 我的学习列表
export const coursePersonList = data =>
  fly.post('/newtrain/api/organize/app/coursePerson/list',
    data
  )

//课程列表
export const coursePersonCourseList = data =>
  fly.post('/organize/app/coursePerson/list',
    data
  )

//人员试卷列表
// http://test.vip.ececloud.cn/puzzle/api/organize/app/answer/paper/list/staff?doc
export const staffList = data =>
  fly.post('/puzzle/api/organize/app/answer/paper/list/staff',
    data
  )

//课程报名
export const coursePersonApply = data =>
  fly.post('/newtrain/api/organize/app/coursePerson/apply',
    data
  )

  // 新的  考试列表
export const listByStaff = data => fly.post('/puzzle/api/organize/app/answer/paper/list/listByStaff',
  data
)

//人员考试状态
export const listByStaffCount = data => fly.post('/puzzle/api/organize/app/answer/paper/list/listByStaffCount',
  data
)

//考试前-当前考试的状态
// http: //test.vip.ececloud.cn/puzzle/api/organize/app/answer/paper/status/check
export const statusCheck = data =>
  fly.post('/puzzle/api/organize/app/answer/paper/status/check', data)

//考试详情
// http: //test.vip.ececloud.cn/puzzle/api/organize/app/paper/info
export const paperInfo = data =>
  fly.post('/puzzle/api/organize/app/paper/info',
    data
  )
// 下一节课时
export const nextLesson = classHourId =>
  fly.post('/newtrain/api/organize/app/coursePerson/nextInfo',
    {
      classHourId
    }
  )
