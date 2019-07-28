/* eslint-disable no-var */
/* eslint-disable indent */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { startCase } from 'lodash';
import { Payment } from 'paypal-rest-sdk';
import React, { FC, useEffect, useRef, useState } from 'react';
import { IceCream } from 'react-kawaii';
import { v4 } from 'uuid';

const product = {
  id: v4(),
  description: 'Ice cream',
  price: 10.0,
  currency: 'USD',
};

type Product = typeof product;

const ItemsTable: React.FC<{ items: Array<Payment | Product> }> = ({
  items,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {Object.entries(items[0])
          .filter(([, value]) => !(typeof value === 'function'))
          .map(([key]) => key)
          .map(key => (
            <TableCell key={key}>{startCase(key)}</TableCell>
          ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map(item => (
        <TableRow key={item.id}>
          {Object.values(item)
            .map(value => JSON.stringify(value, null, 2))
            .map(value => (
              <TableCell key={value}>
                <pre>{value}</pre>
                {/* {typeof value === 'object' ? (
                  <ItemsTable items={[value]} />
                ) : (
                  value
                )} */}
              </TableCell>
            ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export interface StoreProps {}

const Store: FC<StoreProps> = () => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paidFor, setPaidFor] = useState(false);
  const [order, setPayment] = useState<Payment>({
    intent: '',
    payer: {
      payment_method: '',
    },
    transactions: [
      {
        amount: {
          currency: '',
          total: '',
        },
      },
    ],
  });

  useEffect(() => {
    (window as any).paypal
      .Buttons({
        createOrder: (_: any, actions: any) =>
          actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: product.currency,
                  value: product.price,
                },
              },
            ],
          }),
        onApprove: (_: any, actions: any) =>
          actions.order.capture().then((approvedOrder: Payment) => {
            setPaidFor(true);
            setPayment(approvedOrder);
          }),
      })
      .render(paypalRef.current);
  }, []);

  return (
    <div>
      {paidFor ? (
        <>
          <Typography variant="h2">Congrats this is your order</Typography>
          <ItemsTable items={[order]} />
        </>
      ) : (
        <>
          <IceCream />
          <br />
          <br />
          <ItemsTable items={[product]} />
          <br />
          <br />
          <div ref={paypalRef} />
        </>
      )}
    </div>
  );
};

export default Store;
