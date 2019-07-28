/* eslint-disable no-var */
/* eslint-disable indent */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@material-ui/core';
import { startCase } from 'lodash';
import { Payment } from 'paypal-rest-sdk';
import React, { FC, useEffect, useRef, useState } from 'react';
import { CreditCard, IceCream } from 'react-kawaii';
import { Box, Flex } from 'rebass';
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
          .filter(([, value]) => typeof value !== 'function')
          .filter(([key]) => key !== 'id')
          .map(([key]) => key)
          .map(key => (
            <TableCell key={key}>{startCase(key)}</TableCell>
          ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map(({ id, ...item }) => (
        <TableRow key={id}>
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

  const theme = useTheme();

  return (
    <Box>
      {paidFor ? (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
          <Box mb={4}>
            <Typography
              variant="h2"
              style={{ color: theme.colors.success.dark }}
            >
              Successfully ordered!
            </Typography>
          </Box>
          <CreditCard mood="happy" color={theme.colors.success.light} />
        </div>
      ) : (
        <Box mx={3}>
          <Flex flexDirection={['column', 'row']} mb={4}>
            <Box mr={[0, 4]} alignSelf={['center', 'flex-start']} mb={[3, 0]}>
              <IceCream />
            </Box>
            <ItemsTable items={[product]} />
          </Flex>
          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <Box width={['100%', '100%', '50%']} ref={paypalRef} />
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Store;
