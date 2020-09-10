export default {
  userList: [
    {
      name: 'hung',
      type: 0,
      id: 1,
      pass: '1',
      userName: 'hung',
      department: ['admin']
    },
    {
      name: 'hung2',
      type: 1,
      id: 2,
      pass: '2',
      userName: 'hung2',
      department: ['buy']
    },
    {
      name: 'hung3',
      type: 2,
      id: 3,
      pass: '3',
      userName: 'hung3',
      department: ['sell']
    },
    {
      name: 'hung4',
      type: 3,
      id: 4,
      pass: '4',
      userName: 'hun4',
      department: 'Nhân viên'
    },
    {
      name: 'hung5',
      type: 3,
      id: 5,
      pass: '5',
      userName: 'hung5',
      department: 'Nhân viên'
    },
  ],
  orderList: [
    {
      code: 'YCM001',
      time: '20-01-2019',
      userName: 'Hung',
      department: 'Mua Hàng',
      projectName: 'Stu',
      priority: 'Cao',
      userId: 1,
      status: 'Chờ duyệt',
      productList: "[{id: 1, name: 'bong dien' total: 3, information: manufacture : 'Rang Dong', unit: 'cai', project: 'stu', editNumber: 0, rejectReason: '' }]"
    },
    {
      code: 'PXK001',
      time: '20-01-2019',
      userName: 'Hung',
      department: 'Mua Hàng',
      projectName: 'Stu',
      priority: 'Cao',
      userId: 1,
      status: 'Chờ duyệt',
      productList: "[{id: 1, name: 'bong dien' total: 3, information: manufacture : 'Rang Dong', unit: 'cai', project: 'stu', editNumber: 0, rejectReason: '' }]"
    },
  ],
  productList:[
    {
      id: 1,
      name: 'bong dien',
      total: 1000,
      project: 'common'
    }
  ]

}