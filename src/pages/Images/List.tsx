import { Input, Typography } from '@material-ui/core';
import { Button } from 'components';
import React, { useRef, useState } from 'react';
import {
  AutoSizer,
  List,
  ListRowRenderer,
  WindowScroller,
} from 'react-virtualized';
import { list, List as ListItems } from './list';

const circleWidth = 10;

const createRowRenderer = (listItems: ListItems): ListRowRenderer => ({
  key,
  index,
  style,
  isScrolling,
  isVisible,
}) => {
  const row = listItems[index];

  return (
    <div
      key={key}
      style={{
        ...style,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
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

const rowRenderer = createRowRenderer(list);

export interface ImagesProps {}

const initialIndexToScrollTo = 0;

const ImageList: React.FC<ImagesProps> = () => {
  const [value, setValue] = useState('');
  const [indexToScrollTo, setIndexToScrollTo] = useState(
    initialIndexToScrollTo,
  );

  const scrollerRef = useRef(null);

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
      <WindowScroller ref={scrollerRef}>
        {({
          height,
          isScrolling,
          registerChild,
          onChildScroll,
          scrollTop,
        }: any) => (
          <div style={{ flexGrow: 1 }}>
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    style={{ border: '1px solid #ccc' }}
                    height={height}
                    width={width}
                    rowCount={list.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer}
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    onScroll={onChildScroll}
                    scrollToIndex={indexToScrollTo}
                    scrollToAlignment="start"
                  />
                </div>
              )}
            </AutoSizer>
          </div>
        )}
      </WindowScroller>
    </div>
  );
};

export default ImageList;
