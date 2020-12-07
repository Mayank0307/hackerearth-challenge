import React from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getCartState } from '../actions/cartActions';
import { CardActionArea } from '@material-ui/core';
import '../styles/priceCard.css';

const PriceCard = props => {
  return (
    <Card className="price-card">
      <CardContent>
        <Typography color="textPrimary" gutterBottom>
          Total
        </Typography>
        <Typography
          gutterBottom
          color="textSecondary"
          variant="h6"
          component="p"
        >
          Items ({props.totalItemCount}) : ${props.totalPrice}
        </Typography>
      </CardContent>

      <CardActionArea
        style={{
          background: 'rgb(241, 241, 241)',
          opacity: '0.9',
          marginTop: '2.5em',
          padding: '1em'
        }}
      >
        <Typography variant="body1" component="p">
          Order Total : ${props.totalPrice}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    itemsList: state.cart.itemsList || [],
    totalItemCount: state.cart.totalItems,
    totalPrice: state.cart.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCartState: () => {
      dispatch(getCartState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceCard);
