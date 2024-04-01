import { fixture } from 'typeorm-fixture-builder'

import { Schedule } from '../entities/schedule'

export const schedules = {
   schedule1: fixture(Schedule, {
      id: 1,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '9-402',
      lesson_number: 0,
      day_of_the_week: 1,
      week_type: 1,
      group_id: 6,
      discipline_id: 5,
      user_id: 1,
   }),
   schedule2: fixture(Schedule, {
      id: 2,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '9-402',
      lesson_number: 0,
      day_of_the_week: 0,
      week_type: 1,
      group_id: 6,
      discipline_id: 6,
      user_id: 1,
   }),
   schedule3: fixture(Schedule, {
      id: 3,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '9-405',
      lesson_number: 2,
      day_of_the_week: 0,
      week_type: 1,
      group_id: 1,
      discipline_id: 2,
      user_id: 1,
   }),
   schedule4: fixture(Schedule, {
      id: 4,
      semester: 2,
      type_of_occupation: 'практика',
      auditorium: '9-405',
      lesson_number: 3,
      day_of_the_week: 0,
      week_type: 0,
      group_id: 1,
      discipline_id: 2,
      user_id: 1,
   }),
   schedule5: fixture(Schedule, {
      id: 5,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '9-418',
      lesson_number: 2,
      day_of_the_week: 1,
      week_type: 0,
      group_id: 3,
      discipline_id: 4,
      user_id: 1,
   }),
   schedule6: fixture(Schedule, {
      id: 6,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '9-418',
      lesson_number: 1,
      day_of_the_week: 1,
      week_type: 1,
      group_id: 2,
      discipline_id: 4,
      user_id: 1,
   }),
   schedule7: fixture(Schedule, {
      id: 7,
      semester: 2,
      type_of_occupation: 'практика',
      auditorium: '312',
      lesson_number: 0,
      day_of_the_week: 2,
      week_type: 1,
      group_id: 5,
      discipline_id: 7,
      user_id: 2,
   }),
   schedule8: fixture(Schedule, {
      id: 8,
      semester: 2,
      type_of_occupation: 'практика',
      auditorium: '312',
      lesson_number: 0,
      day_of_the_week: 2,
      week_type: 1,
      group_id: 6,
      discipline_id: 7,
      user_id: 2,
   }),
   schedule9: fixture(Schedule, {
      id: 9,
      semester: 2,
      type_of_occupation: 'лекция',
      auditorium: '317',
      lesson_number: 2,
      day_of_the_week: 5,
      week_type: 0,
      group_id: 2,
      discipline_id: 10,
      user_id: 2,
   }),
   schedule10: fixture(Schedule, {
      id: 10,
      semester: 2,
      type_of_occupation: 'практика',
      auditorium: '317',
      lesson_number: 3,
      day_of_the_week: 5,
      week_type: 1,
      group_id: 2,
      discipline_id: 10,
      user_id: 2,
   }),
   schedule11: fixture(Schedule, {
      id: 11,
      semester: 2,
      type_of_occupation: 'лабораторная',
      auditorium: '317',
      lesson_number: 1,
      day_of_the_week: 4,
      week_type: 0,
      group_id: 4,
      discipline_id: 12,
      user_id: 2,
   }),
   schedule12: fixture(Schedule, {
      id: 12,
      semester: 2,
      type_of_occupation: 'лабораторная',
      auditorium: '305',
      lesson_number: 2,
      day_of_the_week: 4,
      week_type: 0,
      group_id: 2,
      discipline_id: 9,
      user_id: 2,
   }),
}