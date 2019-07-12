import { Input, Typography } from '@material-ui/core';
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

const ImageList: React.FC<ImagesProps> = () => {
  const [indexToScrollTo, setIndexToScrollTo] = useState(-1);

  const scrollerRef = useRef(null);

  return (
    <div>
      <Input
        type="number"
        value={indexToScrollTo}
        onChange={({ target: { value } }) => setIndexToScrollTo(Number(value))} // TODO fix gap
      />
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
