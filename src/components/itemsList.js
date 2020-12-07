import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import '../styles/itemsList.css';
import { toastr } from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import {
  addQuantity,
  subtractQuantity,
  getCartState,
  deleteItemFromCart
} from '../actions/cartActions';
import PriceCard from './priceCard';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      itemCount: 1,
      items: []
    };
  }

  componentDidMount() {
    this.setState({
      qty: 1
    });

    const items = JSON.parse(localStorage.getItem('items'));
    if (items === null || items.length === 0) {
      // Re-populate the items when all the items are deleted.
      localStorage.setItem('items', JSON.stringify(this.props.itemsList));
    }

    this.props.getCartState();
  }
  handleIncreaseQuantity = id => {
    this.props.addQuantity(id);
    this.setState(
      {
        qty: this.state.qty
      },
      () => {
        this.setState({
          qty: this.props.addedItem.quantity
        });
      }
    );
  };
  handleDecreaseQuantity = id => {
    this.props.subtractQuantity(id);
    this.setState(
      {
        qty: this.state.qty
      },
      () => {
        this.setState({
          qty: this.props.addedItem.quantity
        });
      }
    );
  };

  handleDeleteItem = id => {
    this.props.deleteItem(id);
    toastr.success('Deleted', 'Item');
  };

  componentDidUpdate(props) {
    localStorage.setItem('items', JSON.stringify(this.props.itemsList));

    if (
      (props && props.addedItem.quantity !== this.props.addedItem.quantity) ||
      (props && props.addedItem.price !== this.props.addedItem.price)
    ) {
      props.getCartState();
    }
  }
  render() {
    return (
      <>
        <Container maxWidth="lg" className="container">
          <Paper className="paper-container">
            <Typography
              align="left"
              style={{ margin: '2em 0 0 2em' }}
              component="h6"
              variant="h4"
            >
              Order Summary
            </Typography>

            <hr style={{ border: '0.5px solid grey', opacity: '0.2' }} />
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    Items ({this.props.itemsList.length})
                  </TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="center">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.itemsList.map(item => (
                  <TableRow key={item.id}>
                    <TableCell align="center">
                      <div className="shopping-cart-item">
                        <img src={item.img_url} alt="" />
                        <p className="item-name">{item.name}</p>
                        <CloseIcon
                          onClick={() => this.handleDeleteItem(item.id)}
                          className="delete-item-icon"
                        />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="qty-container">
                        <span
                          onClick={() => this.handleDecreaseQuantity(item.id)}
                          className="minus-button"
                        >
                          {' '}
                          -{' '}
                        </span>
                        <span className="qty-input">{item.quantity}</span>
                        <span
                          onClick={() => this.handleIncreaseQuantity(item.id)}
                          className="plus-button"
                        >
                          {' '}
                          +{' '}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <span>$ {item.price * item.quantity}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <PriceCard />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemsList: state.cart.itemsList || [],
    addedItem: state.cart.addedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    deleteItem: id => {
      dispatch(deleteItemFromCart(id));
    },
    getCartState: () => {
      dispatch(getCartState());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
