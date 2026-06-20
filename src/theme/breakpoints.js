// theme/breakpoints.js
//
// Thin re-export of the breakpoint tier from tokens.js, kept as its own
// file per the approved Architecture (§1) so responsive JS logic (e.g.
// matchMedia checks in future hooks) has an obvious, single import target
// without reaching into the full tokens object.

import { breakpoint } from './tokens.js';

export default breakpoint;
export { breakpoint };
