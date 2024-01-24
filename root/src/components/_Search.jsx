import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {setSearch} from '../states/loginState'
import {Form, Button, inputGroup, InputGroup} from 'react-bootstrap'


const _Search = () => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(setSearch(searchText))
        console.log(searchText)
        setSearchText('')
    }

  return (
    <div>
        <Form onSubmit={handleSearch}>
            <InputGroup>
                <Form.Control type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                <Button variant="outline-secondary" onClick={() => dispatch(setSearch(searchText))}>Search</Button>
            </InputGroup>
        </Form>


    </div>
  )
}

export default _Search