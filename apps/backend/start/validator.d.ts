import { DateTime } from 'luxon';
declare module '@vinejs/vine/types' {
    interface VineGlobalTransforms {
        date: DateTime;
    }
}
