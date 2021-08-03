import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFoundScreen = () => {
    return (
        <Container className='text-center'>
            <h1>Page Not Found</h1>
            <Link to='/'>
                <Button variant='info'>
                    Go Back Home
                </Button>
            </Link>
            
        </Container>
    )
}

export default NotFoundScreen
