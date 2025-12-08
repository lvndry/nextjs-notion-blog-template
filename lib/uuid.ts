/**
 * Validates UUID format supporting both hyphenated and non-hyphenated formats
 *
 * @param uuid - UUID string to validate
 * @returns true if UUID is valid in either format
 *
 * @example
 * isValidUUID('5d0afad8277a4ffa8eea4820700ee069') // true
 * isValidUUID('5d0afad8-277a-4ffa-8eea-4820700ee069') // true
 * isValidUUID('invalid') // false
 */
export function isValidUUID(uuid: string): boolean {
  // Check for standard hyphenated UUID format
  const hyphenatedUUIDRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Check for non-hyphenated UUID format (like in Notion URLs)
  const nonHyphenatedUUIDRegex = /^[0-9a-f]{32}$/i;

  return hyphenatedUUIDRegex.test(uuid) || nonHyphenatedUUIDRegex.test(uuid);
}

/**
 * Converts UUID between hyphenated and non-hyphenated formats
 * Notion URLs use non-hyphenated format (32 chars), but API requires hyphenated format (36 chars = 32 chars + 4 hyphens)
 *
 * @param uuid - UUID string in either format
 * @returns UUID in hyphenated format for Notion API compatibility
 *
 * @example
 * normalizeUUID('5d0afad8277a4ffa8eea4820700ee069') // '5d0afad8-277a-4ffa-8eea-4820700ee069'
 * normalizeUUID('5d0afad8-277a-4ffa-8eea-4820700ee069') // '5d0afad8-277a-4ffa-8eea-4820700ee069'
 */
export function normalizeUUID(uuid: string): string {
  // Already in hyphenated format
  if (uuid.includes("-")) {
    return uuid;
  }

  if (uuid.length === 32 && /^[0-9a-f]{32}$/i.test(uuid)) {
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(
      12,
      16
    )}-${uuid.slice(16, 20)}-${uuid.slice(20, 32)}`;
  }

  return uuid;
}

/**
 * Prepares UUID for internal use
 *
 * @param uuid - UUID string in either format
 * @returns UUID format for internal use
 *
 * @example
 * prepareUUID('5d0afad8277a4ffa8eea4820700ee069') // '5d0afad8277a4ffa8eea4820700ee069'
 * prepareUUID('5d0afad8-277a-4ffa-8eea-4820700ee069') // '5d0afad8277a4ffa8eea4820700ee069'
 */
export function prepareUUID(uuid: string): string {
  return uuid.replace(/-/g, "");
}
