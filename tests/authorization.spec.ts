import {
  expect,
  test,
} from '@playwright/test'

const DELAY_ON_ROUTING = 3000

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login')
})

test('Go to the home page by registered user', async ({ page }) => {
  await expect(page.getByText('Авторизация')).toBeTruthy()

  await page.getByLabel('Логин').fill('test')
  await page.getByLabel('Пароль').fill('test')

  await page.getByLabel('Войти').click({ timeout: DELAY_ON_ROUTING })
  
  await page.waitForURL('http://localhost:5173/')
  
  await expect(page.url()).toBe('http://localhost:5173/')
});

test('An error occurs when authorizing an unregistered user', async ({ page }) => {
  await expect(page.getByText('Авторизация')).toBeTruthy();

  await page.getByLabel('Логин').fill('incorrectLogin')
  await page.getByLabel('Пароль').fill('incorrectPassword')

  await page.getByLabel('Войти').click({ timeout: DELAY_ON_ROUTING });
  
  await expect(page.getByText('Поле с логином не должно быть пустым!')).toBeVisible()
  await expect(page.getByLabel('Логин')).toHaveText('')

  await expect(page.getByText('Поле с паролем не должно быть пустым!')).toBeVisible()
  await expect(page.getByLabel('Пароль')).toHaveText('')
  
  await expect(page.url()).toBe('http://localhost:5173/login')
});
