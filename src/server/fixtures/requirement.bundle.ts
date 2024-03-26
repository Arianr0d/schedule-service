import { fixture } from 'typeorm-fixture-builder'

import { Requirement } from '../entities/requirement'

export const requirements = {
   requirement1: fixture(Requirement, {
      id: 1,
      name: 'проведение занятий в указанную дату'
   }),
   requirement2: fixture(Requirement, {
      id: 2,
      name: 'проведение занятия в указанном кабинете'
   }),
   requirement3: fixture(Requirement, {
      id: 3,
      name: 'заседание кафедры'
   }),
   requirement4: fixture(Requirement, {
      id: 4,
      name: 'заседание учёного совета'
   }),
   requirement5: fixture(Requirement, {
      id: 5,
      name: 'совещание по качеству'
   }),
   requirement6: fixture(Requirement, {
      id: 6,
      name: 'оперативка в ректорате'
   }),
   requirement7: fixture(Requirement, {
      id: 7,
      name: 'оперативка в директорате'
   }),
   requirement8: fixture(Requirement, {
      id: 8,
      name: 'оперативка в деканате'
   })
}
