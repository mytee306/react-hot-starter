import '@testing-library/react/cleanup-after-each';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import 'jest-dom/extend-expect';
import 'polyfill-object.fromentries';

registerRequireContextHook();
