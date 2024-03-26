import { fixture } from 'typeorm-fixture-builder'

import { Discipline } from '../entities/discipline'

export const disciplines = {
   discipline1: fixture(Discipline, {
      id: 1,
      code: '01.01.01',
      name: 'Математический анализ'
   }),
   discipline2: fixture(Discipline, {
      id: 2,
      code: '01.01.02',
      name: 'Функциональный анализ'
   }),
   discipline3: fixture(Discipline, {
      id: 3,
      code: '01.01.03',
      name: 'Дифференциальные уравнения'
   }),
   discipline4: fixture(Discipline, {
      id: 4,
      code: '01.01.04',
      name: 'Численные методы'
   }),
   discipline5: fixture(Discipline, {
      id: 5,
      code: '01.01.05',
      name: 'Теория принятия решений'
   }),
   discipline6: fixture(Discipline, {
      id: 6,
      code: '01.01.06',
      name: 'Теория игр'
   }),
   discipline7: fixture(Discipline, {
      id: 7,
      code: '02.02.01',
      name: 'Машинное обучение'
   }),
   discipline8: fixture(Discipline, {
      id: 8,
      code: '02.02.02',
      name: 'Математическое программирование'
   }),
   discipline9: fixture(Discipline, {
      id: 9,
      code: '02.02.03',
      name: 'Методы машинного обучения'
   }),
   discipline10: fixture(Discipline, {
      id: 10,
      code: '02.02.04',
      name: 'Проектирование автоматизированных систем'
   }),
   discipline11: fixture(Discipline, {
      id: 11,
      code: '02.02.05',
      name: 'Программирование'
   }),
   discipline12: fixture(Discipline, {
      id: 12,
      code: '02.02.06',
      name: 'Проектирование интеллектуальных систем'
   })
}
