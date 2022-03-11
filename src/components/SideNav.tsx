import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStateValue } from '../state';
import Rating from './Rating';

const SideNav = () => {
   const [{ byStock, byRating, search, sort }, dispatch] = useStateValue();

    
    return (
      <div className="sideNav">
        <span className="title">Filter Products</span>
        <span>
          <Form.Check
            inline
            label="Ascending"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() =>
              dispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHight",
              })
            }
            checked={sort === "lowToHight" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Descending"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() =>
              dispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            inline
            label="Out of Stock"
            name="group1"
            type="checkbox"
            id={`inline-3`}
            onChange={()=> dispatch({
              type:"FILTER_BY_STOCK"
            })}
            checked= {byStock}
          />
        </span>
        <span>
          <label style={{ paddingRight: 10 }}>Rating:</label>

          <Rating
            rating={byRating}
            style={{ cursor: "pointer" }}
            onClick={(i: number | any) =>
              dispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              })
            }
          />
        </span>
        <Button variant="light" onClick={()=> dispatch({
          type: "CLEAR_FILTER"
        })}>Clear Filter</Button>
      </div>
    );
}

export default SideNav
