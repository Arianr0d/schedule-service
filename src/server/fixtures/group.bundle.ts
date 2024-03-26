import { fixture } from 'typeorm-fixture-builder'

import { Group } from '../entities/group'

export const groups = {
   group1: fixture(Group, {
      id: 1,
      code: '123293',
      name: 'М-ПМ-21-1',
      course: 1,
      number_of_students: 15
   }),
   group2: fixture(Group, {
      id: 2,
      code: '123291',
      name: 'М-ПМ-22-1',
      course: 2,
      number_of_students: 10
   }),
   group3: fixture(Group, {
      id: 3,
      code: '123292',
      name: 'М-УК-22-1',
      course: 2,
      number_of_students: 8
   }),
   group4: fixture(Group, {
      id: 4,
      code: '122022',
      name: 'М-АИ-21-1',
      course: 1,
      number_of_students: 10
   }),
   group5: fixture(Group, {
      id: 5,
      code: '122098',
      name: 'АИ-20-1',
      course: 4,
      number_of_students: 18
   }),
   group6: fixture(Group, {
      id: 6,
      code: '122099',
      name: 'ПИ-20-1',
      course: 4,
      number_of_students: 20
   })
}
