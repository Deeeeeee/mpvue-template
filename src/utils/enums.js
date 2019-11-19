export default {
  sexList: [
    { value: 100, name: '无' },
    { value: 101, name: '男' },
    { value: 102, name: '女' }
  ],

  studyStatus: [
    { value: 100, name: '未开始' },
    { value: 101, name: '学习中' },
    { value: 103, name: '已通过' },
    { value: 104, name: '未通过' }
  ],

  allotStatus: [
    { value: 100, name: '未开始' },
    { value: 101, name: '进行中' },
    { value: 102, name: '已结束' },
    { value: 103, name: '已取消' }
  ],
  // 考试状态
  testStatus: [
    { value: 100, name: '即将开始' },
    { value: 101, name: '考试中' },
    { value: 102, name: '考试已结束' },
    { value: 103, name: '考试已取消' }
  ],
  // 试卷题目类型
  questionType: [
    { value: 100, name: '单选' },
    { value: 101, name: '多选' },
    { value: 102, name: '判断' },
    { value: 103, name: '排序' }
  ],
  // 题目选项
  wordMap: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ],
  // 教具适用年龄
  realiaAge: [
    { value: 100, name: '0-1岁' },
    { value: 101, name: '1-1.5岁' },
    { value: 102, name: '1.5-3岁' },
    { value: 103, name: '3-6岁' },
    { value: 104, name: '0-6岁' }
  ],
  // 线下课签到状态
  underlineSignStatus: [
    { value: 0, name: '未到签到时间不能签到' },
    { value: 1, name: '可签到' },
    { value: 2, name: '签到时间已过不能签到' },
    { value: 3, name: '已签到' }
  ]
}
