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
    // TODO: change position style for search responsive!!!!
    <Form
      onSubmit={submitHandler}
      className='hidden-sm-up'
      inline
      style={{
        display: 'flex',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 0,
        position: '',
        right: 0,
      }}
    >
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        // className='mr-sm-2 ml-sm-5'
        style={{
          display: 'inline-flex',
        }}
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-primary'
        className='px-4 '
        inline
        style={{
          display: 'inline-flex',
          marginLeft: 5,
          borderRadius: 300,
        }}
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchComponent
