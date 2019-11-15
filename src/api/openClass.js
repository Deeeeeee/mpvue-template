import fly from '@/utils/fly'

// 公开课列表
export const openClassList = data => fly.post('/organize/app/openCourse/courseList', data)

// 公开课详情
export const traineeSignUp = data => fly.post('/newtrain/api/organize/app/openCourse/openCourseInfo', data)

// 公开课报名
export const signUp = data => fly.post('/newtrain/api/organize/app/traineeSignUp/signUp', data)

// 公开课程课时详情
export const openClassHourInfo = data => fly.post('/newtrain/api/organize/app/openCourse/openClassHourInfo', data)
