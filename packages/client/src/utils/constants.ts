/*
 * Firstname, Lastname input requirements: must start with a lowercase or uppercase letter followed by 3 to 23 characters that may letters only
 */
export const REGEX_Username = /^[A-z]{2,25}$/

/*
 * Input (email) requirements:
 */
export const REGEX_EmailAddress =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/*
 * Street input requirements: must start with a lowercase or uppercase letter followed by 3 to 23 characters that may letters, numbers, underscores, or hyphens
 */
export const REGEX_Street = /^[A-z][A-z0-9-_]{3,25}$/

/*
 * City input requirements: must start with a lowercase or uppercase letter followed by 3 to 23 characters that may letters only
 */
export const REGEX_City = /^[A-z]{3,30}$/

/*
 * Country input requirements: from api
 */
