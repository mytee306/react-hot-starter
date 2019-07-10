import { Input, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
import { list, List as ListItems } from './list';

const rowRenderer = (listItems: ListItems) => ({
  index,
  isScrolling,
  key,
  style,
}: any) => {
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
      <Typography style={{ flexGrow: 1 }}>{row.name}</Typography>
      {isScrolling ? (
        <Typography variant="caption">Scrolling...</Typography>
      ) : null}
    </div>
  );
};

export interface ImagesProps {}

const ImageList: React.FC<ImagesProps> = () => {
  const [indexToScrollTo, setIndexToScrollTo] = useState(-1);

  const scrollerRef = useRef(null);

  return (
    <div>
      <Input
        type="number"
        value={indexToScrollTo}
        onChange={({ target: { value } }) => setIndexToScrollTo(Number(value))}
      />
      <br />
      <br />
      <WindowScroller ref={scrollerRef} scrollElement={window}>
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
                    style={{ border: '1px solid #ccc' }}
                    autoHeight
                    height={height}
                    width={width}
                    overscanRowCount={2}
                    rowCount={list.length}
                    rowHeight={40}
                    rowRenderer={rowRenderer(list)}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollToIndex={indexToScrollTo}
                    scrollTop={scrollTop}
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
