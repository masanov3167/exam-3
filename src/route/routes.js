const express = require('express');
const router = express.Router();
const {login, getGroups, getCourses, getTeachersById, addGroup, deleteGroup, editGroup} = require('../controller/admin/group');
const {addCourse, deleteCourse, editCourse} = require('../controller/admin/coourse');
const {getTeachers, addTeachers, deleteTeachers, editTeachers} = require('../controller/admin/teachers');
const {getStudents, addStudents, deleteStudents, editStudents} = require('../controller/admin/students');
const {getOwnGroups, addTask, getOwnGroupHomeworks} = require('../controller/teacher/groups')
const {getOwnGroupsStudents} = require('../controller/teacher/students')
const {getOwnGroupsData, getOwnGroupsTask, postOwnGroupsTask} = require('../controller/student/groups')
const {verify} = require('../utils/verify')
const {idDecoder} = require('../utils/idDecoder')




router
     .post('/login',  login)

     .post('/groups',  addGroup)
     .delete('/groups/:id', deleteGroup )
     .put('/groups/:id', editGroup )
     .get('/groups', verify, getGroups )


     .put('/courses/:id', editCourse )
     .post('/courses', addCourse)
     .delete('/courses/:id', deleteCourse )
     .get('/courses',verify, getCourses )
     
     .get('/teachers', verify, getTeachers )
     .get('/teachers/:id', getTeachersById )
     .post('/teachers', addTeachers)
     .delete('/teachers/:id', deleteTeachers )
     .put('/teachers/:id', editTeachers )
     
     .get('/students',verify, getStudents )
     .post('/students', addStudents )
     .delete('/students/:id', deleteStudents )
     .put('/students/:id', editStudents )

     .get('/teacher-groups',idDecoder, getOwnGroups )
     .post('/teacher-homeworks', addTask )
     .get('/teacher-homeworks/:id', getOwnGroupHomeworks )

     .get('/student-groups',idDecoder, getOwnGroupsStudents )

     .get('/student-own-groups',idDecoder, getOwnGroupsData )
     .get('/student-own-homeworks/:id',idDecoder, getOwnGroupsTask )
     .post('/student-own-homeworks/:id',idDecoder, postOwnGroupsTask )

module.exports = router;     