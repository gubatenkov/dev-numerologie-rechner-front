import React, { Fragment } from 'react';
import Button from 'react-bootstrap/Button';

export default ({ credits, type, typeMessage, usedType, onBuy }) => {
  const isTypeIncluded = usedType && usedType.includes(type);
  const filtered = credits.filter((c) => c.type === type);
  const isBuyTextVisible = !filtered[0] || filtered[0].total === 0;
  return (
    <Button
      variant={isTypeIncluded ? 'success' : 'secondary'}
      size="sm"
      onClick={() => onBuy(type)}
    >
      {
        isTypeIncluded
          ? <i className="fa fa-icon fa-check-circle-o" />
          : <i className="fa fa-icon fa-shopping-cart" />
      }{' '}
      {typeMessage}{' '}
      {isBuyTextVisible && <Fragment> | <strong>Buy</strong></Fragment>}
    </Button>
  );
}
