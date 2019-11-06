import '@testing-library/react/cleanup-after-each';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import dotenv from 'dotenv';
import 'jest-dom/extend-expect';
import 'polyfill-object.fromentries';
import 'react-stripe-elements';

dotenv.config({ path: '../.env.test' });
registerRequireContextHook();
