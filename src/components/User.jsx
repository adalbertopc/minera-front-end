import React from 'react'
import {Row} from '../components/TableComponents';

export default function User({user}) {

  const {username, firstName, lastName, userType} = user

  return (
    <Row>
      <p><span>Username: </span> {username}</p> 
       <p><span>Name: </span> {firstName} {lastName}</p>
       <p><span>User Type: </span>{userType}</p>
    </Row>
  )
}
