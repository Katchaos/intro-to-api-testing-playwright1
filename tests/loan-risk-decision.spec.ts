import { expect, test } from '@playwright/test'
import { CustomerDto } from '../dto/loan-risk-decision-dto'
import { StatusCodes } from 'http-status-codes'

test('negative decision on the loan', async ({ request }) => {
  const requestBody = new CustomerDto(100, 0, 17, true, 1000, 12)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskScore).toBe(17.2)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
})

test('positive decision on the loan medium risk', async ({ request }) => {
  const requestBody = new CustomerDto(20000, 0, 30, true, 500, 6)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskScore).toBe(1.01875)
})

test('positive decision on the loan low risk', async ({ request }) => {
  const requestBody = new CustomerDto(20000, 0, 30, true, 500, 12)
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskDecision).toBe('positive')
})
