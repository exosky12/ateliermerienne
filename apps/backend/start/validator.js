import { DateTime } from 'luxon';
import { VineDate } from '@vinejs/vine';
VineDate.transform((value) => DateTime.fromJSDate(value));
//# sourceMappingURL=validator.js.map