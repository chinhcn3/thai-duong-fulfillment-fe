import { DatePicker, Input, Select, Space, Table } from 'antd/lib'
import styled from 'styled-components'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
]

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
]

export function Order() {
  return (
    <OrderWrapper>
      <Space direction={'horizontal'}>
        <Input placeholder="Search..." />
        <DatePicker onChange={() => {}} />
        <Select
          style={{ width: 150 }}
          onChange={() => {}}
          placeholder={'Select customer'}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </Space>
      <Table dataSource={dataSource} columns={columns} style={{ marginTop: '20px' }} />
    </OrderWrapper>
  )
}

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
