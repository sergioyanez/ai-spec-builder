# session-spec-counter

## Purpose

Show the user how many specs they have successfully generated during the current page session via an in-memory, non-persistent counter displayed in the generator page header.

## Requirements

### Requirement: Display session spec counter in header

The generator page (`/app`) SHALL display a counter in its header showing the number of specs successfully generated during the current page session.

#### Scenario: Counter shown on page load

- **WHEN** the generator page loads
- **THEN** the header displays a counter with a value of zero

#### Scenario: Counter remains visible with a non-zero value

- **WHEN** one or more specs have been generated in the session
- **THEN** the header displays the counter with the current count

### Requirement: Increment on successful generation

The counter SHALL increment by exactly one for each successful spec generation, where success means a `POST /api/generate` call that returns a spec which is displayed to the user.

#### Scenario: Successful generation increments the counter

- **WHEN** a spec generation request completes successfully and its result is shown
- **THEN** the counter increases by one

#### Scenario: Failed generation does not increment the counter

- **WHEN** a spec generation request fails or returns an error
- **THEN** the counter value is unchanged

#### Scenario: Loading a spec from history does not increment the counter

- **WHEN** the user selects a previously saved spec from history
- **THEN** the counter value is unchanged

### Requirement: Session-only, non-persistent state

The counter SHALL be held only in memory for the current page session and SHALL NOT be persisted to localStorage, cookies, a database, or the server.

#### Scenario: Counter resets on page reload

- **WHEN** the user reloads the page after generating one or more specs
- **THEN** the counter returns to zero

#### Scenario: Count is never written to storage

- **WHEN** the counter increments
- **THEN** no value is written to localStorage, cookies, a database, or the server
