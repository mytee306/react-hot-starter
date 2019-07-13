import { Input, Typography } from '@material-ui/core';
import { Button } from 'components';
import { name } from 'faker';
import React, { useState } from 'react';
import {
  AutoSizer,
  InfiniteLoader,
  List,
  ListRowRenderer,
  WindowScroller,
} from 'react-virtualized';
import { People, people } from './people';

const circleWidth = 10;

const createRowRenderer = (list: People): ListRowRenderer => ({
  key,
  index,
  style,
  isScrolling,
  isVisible,
}) => {
  const row = list[index];

  return (
    <div
      key={key}
      style={{
        ...style,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
      }}
    >
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Typography style={{ marginRight: 10 }}>{row.name}</Typography>
        <div
          style={{
            width: circleWidth,
            height: circleWidth,
            background: isVisible ? 'royalblue' : 'tomato',
            borderRadius: '50%',
          }}
        />
      </div>
      {isScrolling ? (
        <Typography variant="caption">Scrolling...</Typography>
      ) : null}
    </div>
  );
};

const initialIndexToScrollTo = -1;

export interface ImagesProps {}

const ImageList: React.FC<ImagesProps> = () => {
  const [value, setValue] = useState('');

  const [list, setList] = useState(people);

  const [indexToScrollTo, setIndexToScrollTo] = useState(
    initialIndexToScrollTo,
  );

  const rowRenderer = createRowRenderer(list);

  const loadMoreRows = () =>
    new Promise(resolve => {
      console.log('loadMoreRows');

      setList(
        list.concat(
          Array.from(Array(100)).map(() => ({ name: name.findName() })),
        ),
      );

      resolve();
    });

  const rowCount = 2000;

  return (
    <div>
      <Button
        variant="contained"
        style={{ position: 'fixed', right: 20, zIndex: 2 }}
        onClick={() => setIndexToScrollTo(0)}
      >
        Scroll to top
      </Button>
      <form
        onSubmit={e => {
          e.preventDefault();

          setIndexToScrollTo(Number(value));
        }}
      >
        <Input
          type="number"
          value={value}
          onChange={({ target: { value: newValue } }) => setValue(newValue)}
        />
        <Button type="submit">Submit</Button>
      </form>
      <br />
      <br />
      <InfiniteLoader
        rowCount={rowCount}
        isRowLoaded={({ index }) => Boolean(list[index])}
        loadMoreRows={loadMoreRows}
      >
        {({ registerChild, onRowsRendered }) => (
          <WindowScroller
            onScroll={() => setIndexToScrollTo(initialIndexToScrollTo)}
          >
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    ref={registerChild}
                    autoHeight
                    height={height}
                    width={width}
                    onRowsRendered={onRowsRendered}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    rowHeight={40}
                    rowCount={rowCount}
                    rowRenderer={rowRenderer}
                    scrollToIndex={indexToScrollTo}
                    style={{ border: '1px solid #ccc' }}
                    scrollToAlignment="start"
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    </div>
  );
};

export default ImageList;
