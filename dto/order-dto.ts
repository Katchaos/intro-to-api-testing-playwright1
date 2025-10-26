export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  constructor(
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = 'OPEN'
    this.courierId = 0
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  static createOrderWithRandomData(): OrderDto {
    return new OrderDto(
      'John Doe',
      '+380999999999',
      'urgent order',
      Math.floor(Math.random() * 100),
    )
  }

  static createOrderWithLowPriority(): OrderDto {
    return new OrderDto(
      'John Doe',
      '+380999999999',
      'Low Priority',
      Math.floor(Math.random() * 100),
    )
  }
}
