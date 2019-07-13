import { Input, Typography } from '@material-ui/core';
import { Button } from 'components';
import React, { useState } from 'react';
import {
  AutoSizer,
  InfiniteLoader,
  List,
  ListRowRenderer,
  WindowScroller,
} from 'react-virtualized';
import { list as listItems, List as ListItems } from './list';

const circleWidth = 10;

const createRowRenderer = (list: ListItems): ListRowRenderer => ({
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
        padding: '0 20',
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

export interface ImagesProps {}

const initialIndexToScrollTo = 0;

const ImageList: React.FC<ImagesProps> = () => {
  const [value, setValue] = useState('');

  const [list, setList] = useState(listItems.slice(0, listItems.length / 2));

  const [indexToScrollTo, setIndexToScrollTo] = useState(
    initialIndexToScrollTo,
  );

  const rowRenderer = createRowRenderer(list);

  return (
    <div>
      <Button
        variant="contained"
        style={{ position: 'fixed', right: 20, zIndex: 2 }}
        onClick={() => setIndexToScrollTo(initialIndexToScrollTo)}
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
        isRowLoaded={({ index }) => Boolean(list[index])}
        loadMoreRows={() =>
          new Promise(resolve => {
            console.log('loadMoreRows');

            setList(list.concat(listItems.slice(listItems.length / 2)));

            resolve();
          })
        }
      >
        {({ registerChild, onRowsRendered }) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    ref={registerChild}
                    autoHeight
                    style={{ border: '1px solid #ccc' }}
                    height={height}
                    width={width}
                    rowCount={list.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                    onRowsRendered={onRowsRendered}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    scrollToIndex={indexToScrollTo}
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
