import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'

// manage
import manage from '../components/manage/manage'
import managedir from '../components/manage/managedir'
import dirinsert from '../components/manage/dirinsert'
import dirupdate from '../components/manage/dirupdate'

import managephase from '../components/manage/managephase'
import phaseinsert from '../components/manage/phaseinsert'

import manageclass from '../components/manage/manageclass'

import managestudent from '../components/manage/managestudent'
import studentinsert from '../components/manage/studentinsert'

import manageteacher from '../components/manage/manageteacher'
import teacherinsert from '../components/manage/teacherinsert'

import xlsx from '../components/manage/xlsx'
// teacher

import teacher from '../components/teacher/teacher'
import qtypes from '../components/teacher/qtypes'
import qinsert from '../components/teacher/qinsert'

import textmanage from '../components/teacher/textmanage'
import textinsert from '../components/teacher/textinsert'
// student


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
      {
          path:'/manage',
          name:'manage',
          component:manage,
          children:[
              {
                  path:'managephase',
                  name:'managephase',
                  component:managephase
              },
              {
                  path:'managedir',
                  name:'managedir',
                  component:managedir
              },
              {
                  path:'dirinsert',
                  name:'dirinsert',
                  component: dirinsert
              },
              {
                  path:'dirupdate',
                  name:'dirupdate',
                  component: dirupdate
              },
              {
                  path:'phaseinsert',
                  name:'phaseinsert',
                  component: phaseinsert
              },
              {
                  path:'manageclass',
                  name:'manageclass',
                  component: manageclass
              },
              {
                  path:'managestudent',
                  name:'managestudent',
                  component: managestudent
              },
              {
                  path:'studentinsert',
                  name:'studentinsert',
                  component: studentinsert
              },
              {
                  path:'xlsx',
                  name:'xlsx',
                  component:xlsx
              },
              {
                  path:'manageteacher',
                  name:'manageteacher',
                  component:manageteacher
              },
              {
                  path:'teacherinsert',
                  name:'teacherinsert',
                  component:teacherinsert
              }
          ]
      },
      {
          path:'/teacher',
          name:'teacher',
          component:teacher,
          children:[
              {
                  path:'qtypes',
                  name:'qtypes',
                  component:qtypes
              },
              {
                  path:'qinsert',
                  name:'qinsert',
                  component:qinsert
              },
              {
                  path:'textmanage',
                  name:'textmanage',
                  component:textmanage
              },
              {
                  path:'textinsert',
                  name:'textinsert',
                  component:textinsert
              }

          ]
      }
  ]
})
