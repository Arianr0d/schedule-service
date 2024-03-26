import { fixture } from 'typeorm-fixture-builder'

import { User } from '../entities/user'

export const users = {
    user1: fixture(User, {
        id: 1,
        fullname: 'Попова Елизавета Максимовна',
        chair_code: '01.03.03',
        chair_name: 'ПРИКЛАДНАЯ МАТЕМАТИКА',
        faculty_code: 'ФАИ',
        login: 'test',
        password: 'test'
    }),
    user2: fixture(User, {
        id: 2,
        fullname: 'Карпов Марк Максимович',
        chair_code: '01.04.05',
        chair_name: 'АВТОМАТИЗИРОВАННЫЕ СИСТЕМЫ УПРАВЛЕНИЯ',
        faculty_code: 'ФАИ',
        login: 'test1',
        password: 'test1'
    })
}
