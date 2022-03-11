import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useStateValue } from '../state'
import Rating from './Rating'

const SingleProduct = ({product}:any) => {

    const [{cart}, dispatch]= useStateValue()
    return (
      <div className="products">
        <Card>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Subtitle>
              <span>€ {product.price.split(".")[0]}</span>
              <Rating rating={product.ratings} />
            </Card.Subtitle>

            {cart.some((p: { id: any }) => p.id === product.id) ? (
              <Button
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  });
                }}
                variant="danger"
              >
                Remove From Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
                disabled={!product.inStock}
              >
                {!product.inStock ? "Out Of Stock" : "Add To Cart"}
              </Button>
            )}
          </Card.Body>
        </Card>
      </div>
    );
}

export default SingleProduct
