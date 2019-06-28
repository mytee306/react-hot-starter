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
import React, { FC, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ghost from '../img/ghost.svg';

const product = {
  description: 'Ghostly sigh',
  price: 100.0,
  currency: 'USD',
};

const ItemsTable = <Props extends { items: Record<string, any>[] }>({
  items,
}: Props) => (
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
        <TableRow key={uuid()}>
          {Object.values(item)
            .map(value => JSON.stringify(value, null, 2))
            .map(value => (
              <TableCell key={uuid()}>
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

export const Store: FC<StoreProps> = () => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paidFor, setPaidFor] = useState(false);
  const [order, setOrder] = useState({});

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
          actions.order.capture().then((approvedOrder: any) => {
            setPaidFor(true);
            setOrder(approvedOrder);
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
          <img src={ghost} alt={product.description} height={200} />
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
