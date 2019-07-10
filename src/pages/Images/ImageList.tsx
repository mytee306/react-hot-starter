import { Input } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
import { list, List as ListItems } from './list';

const rowRenderer = (listItems: ListItems) => ({
  index,
  isScrolling,
  isVisible,
  key,
  style,
}: any) => {
  const row = listItems[index];

  return (
    <div
      key={key}
      style={{ ...style, display: isVisible ? 'initial' : 'none' }}
    >
      {row.name}
    </div>
  );
};

export interface ImagesProps {}

const ImageList: React.FC<ImagesProps> = () => {
  // const [list, setList] = useState<{ name: string }[]>([]);

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
          <div>
            <AutoSizer disableHeight>
              {({ width }) => (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    height={height}
                    width={width}
                    overscanRowCount={2}
                    rowCount={list.length}
                    rowHeight={30}
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
