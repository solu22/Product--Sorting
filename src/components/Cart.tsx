import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { useStateValue } from '../state'
import Rating from './Rating'

const Cart = () => {
    const[{cart}, dispatch]=useStateValue()

    const [total, setTotal] = useState(null)
    
  
    useEffect(()=>{
       setTotal(cart.reduce((acc: any, curr: any) => acc + Number(curr.price)*curr.qty, 0));
   },[cart])

    return (
      <div className="home">
        <div className="product-container">
          <ListGroup>
            {cart.map((ca: any, index: React.Key | null | undefined) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={2}>
                    <Image src={ca.image} alt={ca.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{ca.name}</span>
                  </Col>
                  <Col md={2}>€ {ca.price}</Col>
                  <Col md={2}>
                    <Rating rating={ca.ratings} />
                  </Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={ca.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: ca.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {[...Array(ca.inStock).keys()].map((x, i) => (
                        <option key={i}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: ca,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" color="red" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="sideNav checkout">
          <span className="title">Subtotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: € {total}
          </span>
          <Button type="button" disabled={cart.length === 0}>
            CheckOut
          </Button>
        </div>
      </div>
    );
}

export default Cart
