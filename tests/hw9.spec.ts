import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { OrderDto } from '../dto/order-dto'

test('update order with valid id and api key', async ({ request }) => {
  const requestBody = new OrderDto( 'John', '98654578', 'READY', 1)
  const headers = { api_key: '1234567890123456' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/' + '1', {
    data: requestBody,
    headers,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect(response.status()).toBe(StatusCodes.OK)
})

test('update order with invalid api key', async ({ request }) => {
  const requestBody = OrderDto.createOrderWithLowPriority()
  const headers = { api_key: '1234' }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/' + '1', {
    data: requestBody,
    headers,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('delete order with correct id should receive code 204', async ({ request }) => {
  const requestBody = new OrderDto( 'John', '98654578', 'READY', 1)
  const headers = { api_key: '1234567890123456' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/' + '1', {
    data: requestBody,
    headers,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with incorrect api should receive code 401', async ({ request }) => {
  const requestBody = new OrderDto( 'John', '98654578', 'READY', 1)
  const headers = { api_key: '1234' }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/' + '1', {
    data: requestBody,
    headers,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.text())

  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('login with correct username and password should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: {
      username: 'Jack Black',
      password: '12345puyt',
    },
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect(response.status()).toBe(StatusCodes.OK)
})

test('login with no username or password should receive code 500', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: {
      username: 'Jack Black',
      password: '',
    },
  })

  console.log('response status:', response.status())
  console.log('response body:', await response.json())

  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
