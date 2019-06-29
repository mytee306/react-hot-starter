import { mapStateToProps } from '.';
import { initialState, selectSignedInFlag } from '../store/reducer';

const mappedState = mapStateToProps({ isSignedIn: selectSignedInFlag })(
  initialState,
);

describe('Utilities', () => {
  test(mapStateToProps.name, () => {
    expect(mappedState).toEqual({ isSignedIn: false });
  });
});
