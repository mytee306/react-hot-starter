import { initialState, selectSignedInFlag } from 'store/reducer';
import { mapStateToProps } from '.';

const mappedState = mapStateToProps({ isSignedIn: selectSignedInFlag })(
  initialState,
);

describe('Utilities', () => {
  test(mapStateToProps.name, () => {
    expect(mappedState).toEqual({ isSignedIn: false });
  });
});
