import { initialState, selectSignedInFlag } from 'store';
import { mapStateToProps } from '.';

const mappedState = mapStateToProps({ isSignedIn: selectSignedInFlag })(
  initialState,
);

describe('Utilities', () => {
  test(mapStateToProps.name, () => {
    expect(mappedState).toEqual({ isSignedIn: false });
  });
});
