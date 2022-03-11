import React from 'react'
import { Badge, Button, Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import { AiFillDelete } from 'react-icons/ai';
import { FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useStateValue } from '../state';
import { Product } from '../types';


const Header = () => {
  const [{cart, search}, dispatch]= useStateValue()
    return (
      <Navbar style={{ backgroundColor: "#2FA4FF" }} variant="dark">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "WindowText" }}
            >
              TURUN KAUPPA
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <Form.Control
              style={{ width: 200 }}
              type="text"
              placeholder="Search product here"
              onChange={(e) => {
                dispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
          <Nav>
            <Dropdown align= "end">
              <Dropdown.Toggle variant="success" >
                <FaCartPlus color="white" fontSize="25px" />
                <Badge>{cart.length}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxWidth: "370px" }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((c: any) => (
                      <span className="cartitem" key={c.id}>
                        <img src={c.image} className="cartImg" alt={c.name} />

                        <div className="cartItemDetail">
                          <span>{c.name}</span>
                          <span>€ {c.price}</span>
                        </div>
                        <AiFillDelete
                          color="red"
                          fontSize="20px"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: c,
                            })
                          }
                        />
                      </span>
                    ))}

                    <Link to="/cart">
                      <Button size="lg" style={{ width: "95%", margin:"0 10px" }}>
                        Go To Cart List
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty ! </span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default Header
