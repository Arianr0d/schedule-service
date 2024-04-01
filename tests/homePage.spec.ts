import {
   expect,
   test,
} from '@playwright/test'

const DELAY_SHOW_DIALOG = 2000
const DELAY_HIDDEN_DIALOG = 3000
const DELAY_ON_ROUTING = 5000
const DELAY_SHOW_LISTBOX = 3000
const DELAY_HIDDEN_LISTBOX = 1000
const DELAY_LOADING_TABLE = 2000

test.beforeEach(async ({ page }) => {
   await page.goto('http://localhost:5173/login')

   await expect(page.getByText('Авторизация')).toBeTruthy()

   await page.getByLabel('Логин').fill('test')
   await page.getByLabel('Пароль').fill('test')

   await page.getByLabel('Войти').click({ timeout: DELAY_ON_ROUTING })

   await page.waitForURL('http://localhost:5173/')
  
   await expect(page.url()).toBe('http://localhost:5173/')
})

test('User data is loaded on the home page after registration', async ({ page }) => {
   await page.getByLabel('Данные пользователя').click()
   
   await expect(page.getByLabel('Данные пользователя')).toHaveAttribute('aria-expanded', 'true')

   const menuItems = page.getByRole('menuitem')

   await expect(menuItems).toHaveCount(3)

   await expect(menuItems.nth(0).locator('.v-card-title'))
      .toHaveText('ФИО:')
   await expect(menuItems.nth(0).locator('.v-card-subtitle'))
      .toHaveText('Попова Елизавета Максимовна')

   await expect(menuItems.nth(1).locator('.v-card-title'))
      .toHaveText('Факультет:')
   await expect(menuItems.nth(1).locator('.v-card-subtitle'))
      .toHaveText('ФАИ')

   await expect(menuItems.nth(2).locator('.v-card-title'))
      .toHaveText('Кафедра:')
   await expect(menuItems.nth(2).locator('.v-card-subtitle'))
      .toHaveText('ПРИКЛАДНАЯ МАТЕМАТИКА')
})

test('Log out of account and go to the registration page', async ({ page }) => {
   await page.getByLabel('Выход из аккаунта').click({ timeout: DELAY_ON_ROUTING })

   await page.waitForURL('http://localhost:5173/login')
  
   await expect(page.url()).toBe('http://localhost:5173/login')

   await expect(page.getByText('Авторизация')).toBeTruthy()
})

test('A schedule table loaded after user authorized', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)
})

test('Sorting table with schedule', async ({ page }) => {
   await page.getByPlaceholder('Поиск по дисциплине').fill('е')
   await page.getByText('Наименование дисциплины').click({ timeout: DELAY_LOADING_TABLE })

   await expect(page.locator('.v-data-table__th--sorted'))
      .toHaveText('Наименование дисциплины')
   await expect(page.locator('.v-data-table__th--sorted .mdi-arrow-up')).toBeTruthy()

   const filteredRows = await page.getByRole('rowgroup').locator('.v-data-table__tr')

   await expect(filteredRows).toHaveCount(4)

   await expect(filteredRows.nth(0)).toContainText('Теория игр')
   await expect(filteredRows.nth(1)).toContainText('Теория принятия решений')
   await expect(filteredRows.nth(2)).toContainText('Численные методы')
   await expect(filteredRows.nth(3)).toContainText('Численные методы')

   await page.getByText('Наименование дисциплины').click()

   await expect(page.locator('.v-data-table__th--sorted .mdi-arrow-down')).toBeTruthy()

   const sortedRows = await page.getByRole('rowgroup').locator('.v-data-table__tr')

   await expect(sortedRows).toHaveCount(4)

   await expect(sortedRows.nth(0)).toContainText('Численные методы')
   await expect(sortedRows.nth(1)).toContainText('Численные методы')
   await expect(sortedRows.nth(2)).toContainText('Теория принятия решений')
   await expect(sortedRows.nth(3)).toContainText('Теория игр')
})

test('Filtering the schedule table', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr'))
      .toHaveCount(6)

   await expect(page.getByPlaceholder('Поиск по дисциплине')).toBeVisible()
   await page.getByPlaceholder('Поиск по дисциплине').fill('Функц')
   
   const tableRows = await page.getByRole('rowgroup').locator('.v-data-table__tr')

   await expect(tableRows).toHaveCount(2)

   await expect(tableRows.nth(0)).toContainText('Функциональный анализ')
   await expect(tableRows.nth(1)).toContainText('Функциональный анализ')
})

test('Saving changes to the requirement editing form changes the data to schedule', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)

   const rowWithRequirementBefore = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirementBefore).toContainText('Теория принятия решений')
   await expect(rowWithRequirementBefore).toContainText('оперативка в ректорате')
   await expect(rowWithRequirementBefore).toContainText('перенести занятие на пятницу')

   await rowWithRequirementBefore.click({ timeout: DELAY_SHOW_DIALOG })

   const dialogBeforeChange = await page.getByRole('dialog')

   await expect(dialogBeforeChange).toBeVisible()

   await expect(dialogBeforeChange.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория принятия решений')

   await expect(dialogBeforeChange.getByRole('combobox')).toContainText('оперативка в ректорате')
   await expect(dialogBeforeChange.getByLabel('Описание требования'))
      .toHaveValue('перенести занятие на пятницу')

   await dialogBeforeChange.getByRole('combobox').click({ timeout: DELAY_SHOW_LISTBOX })

   await expect(page.getByRole('listbox')).toBeVisible()
   
   await page.getByRole('option').nth(4).click({ timeout: DELAY_HIDDEN_LISTBOX })

   await expect(page.getByRole('listbox')).toBeHidden()

   await expect(dialogBeforeChange.getByRole('combobox')).toContainText('совещание по качеству')

   await dialogBeforeChange.getByLabel('Описание требования').fill('перенести занятие на субботу')

   await expect(dialogBeforeChange.getByLabel('Описание требования'))
      .toHaveValue('перенести занятие на субботу')

   await dialogBeforeChange.getByLabel('Сохранить').click({ timeout: DELAY_HIDDEN_DIALOG })

   await expect(page.getByRole('dialog')).toBeHidden()
   
   const rowWithRequirementAfter = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirementAfter).toContainText('Теория принятия решений')
   await expect(rowWithRequirementAfter).toContainText('совещание по качеству')
   await expect(rowWithRequirementAfter).toContainText('перенести занятие на субботу')

   await rowWithRequirementAfter.click({ timeout: DELAY_SHOW_DIALOG })

   const dialogAfterChange = await page.getByRole('dialog')

   await expect(dialogAfterChange).toBeVisible()

   await expect(dialogAfterChange.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория принятия решений')

   await expect(dialogAfterChange.getByRole('combobox')).toContainText('совещание по качеству')
   await expect(dialogAfterChange.getByLabel('Описание требования'))
      .toHaveValue('перенести занятие на субботу')

   await dialogAfterChange.getByRole('combobox').click({ timeout: DELAY_SHOW_LISTBOX })

   await expect(page.getByRole('listbox')).toBeVisible()
   
   await page.getByRole('option').nth(5).click({ timeout: DELAY_HIDDEN_LISTBOX })

   await expect(page.getByRole('listbox')).toBeHidden()

   await expect(dialogAfterChange.getByRole('combobox')).toContainText('оперативка в ректорате')

   await dialogAfterChange.getByLabel('Описание требования').fill('перенести занятие на пятницу')

   await expect(dialogAfterChange.getByLabel('Описание требования'))
      .toHaveValue('перенести занятие на пятницу')

   await dialogAfterChange.getByLabel('Сохранить').click({ timeout: DELAY_HIDDEN_DIALOG })

   await expect(page.getByRole('dialog')).toBeHidden()

   const finalViewRow = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(finalViewRow).toContainText('Теория принятия решений')
   await expect(finalViewRow).toContainText('оперативка в ректорате')
   await expect(finalViewRow).toContainText('перенести занятие на пятницу')
})

test('Adding and deleting requirement', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)

   const rowWithoutRequirement = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(1)

   await expect(rowWithoutRequirement).toContainText('Теория игр')

   await rowWithoutRequirement.click({ timeout: DELAY_SHOW_DIALOG })

   const dialogBeforeChange = await page.getByRole('dialog')

   await expect(dialogBeforeChange).toBeVisible()

   await expect(dialogBeforeChange.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория игр')

   await expect(dialogBeforeChange.locator('.v-select__selection-text')).toHaveText('')
   await expect(dialogBeforeChange.getByLabel('Описание требования'))
      .toHaveValue('')

   await dialogBeforeChange.getByRole('combobox').click({ timeout: DELAY_SHOW_LISTBOX })

   await expect(page.getByRole('listbox')).toBeVisible()
   
   await page.getByRole('option').nth(7).click({ timeout: DELAY_HIDDEN_LISTBOX })

   await expect(page.getByRole('listbox')).toBeHidden()

   await expect(dialogBeforeChange.getByRole('combobox')).toContainText('оперативка в деканате')

   await dialogBeforeChange.getByLabel('Описание требования').fill('Не ставить занятие на понедельник')

   await expect(dialogBeforeChange.getByLabel('Описание требования'))
      .toHaveValue('Не ставить занятие на понедельник')

   await dialogBeforeChange.getByLabel('Сохранить').click({ timeout: DELAY_HIDDEN_DIALOG })

   await expect(page.getByRole('dialog')).toBeHidden()
   
   const rowWithRequirement = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(1)

   await expect(rowWithRequirement).toContainText('Теория игр')
   await expect(rowWithRequirement).toContainText('оперативка в деканате')
   await expect(rowWithRequirement).toContainText('Не ставить занятие на понедельник')

   await rowWithRequirement.click({ timeout: DELAY_SHOW_DIALOG })

   const dialogAfterChange = await page.getByRole('dialog')

   await expect(dialogAfterChange).toBeVisible()

   await expect(dialogAfterChange.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория игр')

   await expect(dialogAfterChange.getByRole('combobox')).toContainText('оперативка в деканате')
   await expect(dialogAfterChange.getByLabel('Описание требования'))
      .toHaveValue('Не ставить занятие на понедельник')

   await dialogAfterChange.getByLabel('Удалить').click({ timeout: DELAY_HIDDEN_DIALOG })

   await expect(page.getByRole('dialog')).toBeHidden()

   const finalViewRow = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(1)

   await expect(finalViewRow).toContainText('Теория игр')
   await expect(finalViewRow).not.toContainText('оперативка в деканате')
   await expect(finalViewRow).not.toContainText('Не ставить занятие на понедельник')
})

test('Clicking on the schedule row opens the requirement editing form', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr'))
      .toHaveCount(6)

   const rowWithRequirement = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirement).toContainText('Теория принятия решений')
   await expect(rowWithRequirement).toContainText('оперативка в ректорате')
   await expect(rowWithRequirement).toContainText('перенести занятие на пятницу')

   await rowWithRequirement.click({ timeout: DELAY_SHOW_DIALOG })

   const dialog = await page.getByRole('dialog')

   await expect(dialog).toBeVisible()

   await expect(dialog.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория принятия решений')

   await expect(dialog.getByRole('combobox')).toContainText('оперативка в ректорате')
   await expect(dialog.getByLabel('Описание требования')).toHaveValue('перенести занятие на пятницу')
})

test('Cancellation on the requirement editing form does not lead to changes', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)

   const rowWithRequirementBefore = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirementBefore).toContainText('Теория принятия решений')
   await expect(rowWithRequirementBefore).toContainText('оперативка в ректорате')
   await expect(rowWithRequirementBefore).toContainText('перенести занятие на пятницу')

   await rowWithRequirementBefore.click({ timeout: DELAY_SHOW_DIALOG })

   const dialog = await page.getByRole('dialog')

   await expect(dialog).toBeVisible()

   await expect(dialog.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория принятия решений')

   await expect(dialog.getByRole('combobox')).toContainText('оперативка в ректорате')
   await expect(dialog.getByLabel('Описание требования')).toHaveValue('перенести занятие на пятницу')

   await dialog.getByLabel('Описание требования').fill('перенести занятие на субботу')

   await expect(dialog.getByLabel('Описание требования')).toHaveValue('перенести занятие на субботу')

   await dialog.getByLabel('Отменить').click({ timeout: DELAY_HIDDEN_DIALOG })

   await expect(page.getByRole('dialog')).toBeHidden()
   
   const rowWithRequirementAfter = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirementAfter).toContainText('Теория принятия решений')
   await expect(rowWithRequirementAfter).toContainText('оперативка в ректорате')
   await expect(rowWithRequirementAfter).toContainText('перенести занятие на пятницу')
})

test('Editing a schedule without a requirement does not contain a delete button', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)

   const rowWithoutRequirement = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(1)

   await expect(rowWithoutRequirement).toContainText('Теория игр')
   await expect(rowWithoutRequirement.locator('.v-data-table__td').nth(11)).toHaveText('')
   await expect(rowWithoutRequirement.locator('.v-data-table__td').nth(12)).toHaveText('')
   await expect(rowWithoutRequirement.locator('.v-data-table__td').nth(13)).toHaveText('')

   await rowWithoutRequirement.click({ timeout: DELAY_SHOW_DIALOG })

   const dialog = await page.getByRole('dialog')

   await expect(dialog).toBeVisible()

   await expect(dialog.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория игр')

   await expect(dialog.locator('.v-select__selection-text')).toHaveText('')
   await expect(dialog.getByLabel('Описание требования'))
      .toHaveValue('')

   await expect(dialog.getByLabel('Удалить')).toBeHidden()
})

test('Editing a schedule with a requirement contains a delete button', async ({ page }) => {
   await expect(page.getByRole('rowgroup').locator('.v-data-table__tr')).toHaveCount(6)

   const rowWithRequirement = await page.locator('.v-data-table__tbody .v-data-table__tr').nth(0)

   await expect(rowWithRequirement).toContainText('Теория принятия решений')
   await expect(rowWithRequirement).toContainText('оперативка в ректорате')
   await expect(rowWithRequirement).toContainText('перенести занятие на пятницу')

   await rowWithRequirement.click({ timeout: DELAY_SHOW_DIALOG })

   const dialog = await page.getByRole('dialog')

   await expect(dialog).toBeVisible()

   await expect(dialog.getByLabel('Наименование дисциплины'))
      .toHaveText('Теория принятия решений')

   await expect(dialog.getByRole('combobox')).toContainText('оперативка в ректорате')
   await expect(dialog.getByLabel('Описание требования'))
      .toHaveValue('перенести занятие на пятницу')

   await expect(dialog.getByLabel('Удалить')).toBeVisible()
})
