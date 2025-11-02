import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../dto/login-dto'

test('should return token with correct name and password', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()

  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('response should contain valid JWT token', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })

  const jwtValue = await response.text();
  const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

  console.log('response body and token:' + jwtValue)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(jwtValue).toMatch(jwtRegex);
})

test('should not return token with incorrect name and password', async ({ request }) => {
  const requestBody = new LoginDto('degtiareva', '')
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token', await response.text())
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('should not return token with incorrect http method', async ({ request }) => {
  const requestBody = new LoginDto('degtiareva', 'Trfhrh76599/')
  const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  console.log('response body and token', await response.text())
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('should not return token with incorrect body structure', async ({ request }) => {
  const requestBody = LoginDto.createLoginDto()
  const invalidRequestBody = { username: requestBody.username }
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: invalidRequestBody,
  })
  console.log('response body', await response.text())
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
