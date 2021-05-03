import React from 'react'
import {Row} from '../components/TableComponents';

export default function Congestion({congestion}) {

  const {coords, description, date} = congestion

  const fecha = date.split("T")
  const hora = fecha[1].split(".")

  return (
    <Row>
       <p><span>coords: </span> {coords[0]}, {congestion.coords[1]}</p> 
       <p><span>description: </span> {description}</p>
       <p><span>date: </span>{fecha[0]} <span>; </span>{hora[0]}</p>
       
    </Row>
  )
}
