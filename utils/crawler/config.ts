export const SKIP_PROTOCOL_PREFIXES = [
  "mailto:",
  "tel:",
  "sms:",
  "javascript:",
  "data:",
  "blob:",
  "about:",
];

export const SKIP_EXTENSION_REGEX =
  /\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|doc|docx|xls|xlsx|ppt|pptx)(\?.*)?$/i;

export const SKIP_HOST_PATTERNS = [
  /(^|\.)facebook\.com$/i,
  /(^|\.)instagram\.com$/i,
  /(^|\.)x\.com$/i,
  /(^|\.)twitter\.com$/i,
  /(^|\.)yelp\.com$/i,
  /(^|\.)bbb\.org$/i,
];
