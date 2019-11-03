import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import 'polyfill-object.fromentries';

registerRequireContextHook();
