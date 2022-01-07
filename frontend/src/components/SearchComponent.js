import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchComponent = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      className='ml-sm-5'
      inline
      style={{
        display: 'inline-block',
        marginLeft: 10,
      }}
    >
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style={{
          display: 'inline-block',
        }}
      ></Form.Control>
      {/* <Button
        type='submit'
        variant='outline-success'
        className='p-2'
        inline
        style={{
          display: 'inline-block',
        }}
      >
        Search
      </Button> */}
    </Form>
  )
}

export default SearchComponent
