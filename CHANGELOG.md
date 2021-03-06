# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/benzinho75/JEECE-collab/compare/v1.0.1...HEAD)

### To fix

- white screen when loading convo
- messages first appearing left before going to the right place
- new messages sometimes saying "in a few seconds" instead of "a few seconds ago"
- conversations updatedAt field not being updated on new messages

## [v1.0.1](https://github.com/benzinho75/JEECE-collab/compare/v1.0.0...v1.0.1) - 2021-03-16

### Added

- conversations sorting (by date or alphabetically) => need to join User on ConvToUser for firstname sorting

# Fixed

- conversations sometimes not loading messages on first try (cache pb ?)

## [v1.0.0](https://github.com/benzinho75/JEECE-collab/compare/v0.0.4...v1.0.0) - 2021-03-15

### Added

- displaying existing convos of the user
- Admin panel
- accepting / refusing new users
- users can't access website while they're not accepted or if they are refused
- setting convs to inactive
- Uploading files using FilePond (admin uploads document for selected services & postes, file is stored in server filesystem. Path, name and services / postes are stored in postgres)
- documents GET route
- displaying documents
- downloading docs
- sorting docs
- Profile picture upload (storing in server fs + path in db) and display

### Fixed

- messages display bug in Chrome
- need to reload the page after logging in or registering

## [v0.0.4](https://github.com/benzinho75/JEECE-collab/compare/v0.0.3...v0.0.4) - 2021-03-12

### Added

- Home page with user info display
- Search bar to search users by firstname, lastname, service name or poste name
- corresponding queries
- modal populated with results
- Conversation resolver hooks
- Going to a matching conversation if it exists (/conversation/[uuid])
- Creating the convo if it doesn't exist then redirecting
- Messages display in convo
- Adding message
- Real-time with socket.io
- scrolling to bottom when new message gets added

### Fixed

- bug when switching to logout, login, register (might be because of where hooks are called)
- messages in reverse order
- convo window not growing when many messages
- socket bug when sending the same message again (was actually a pb with loading the existing messages)
- space at the bottom when many messages

## [v0.0.3](https://github.com/benzinho75/JEECE-collab/compare/v0.0.2...v0.0.3) - 2021-03-04

### Added

- Token-based authentication w/ jsonwebtoken
- Added front-end structure (React w/ Next.js & Chakra UI)
- Built register page and corresponding components
- Added urql client and installed graphql-codegen
- Configured CORS globally
- Register page finished with proper error handling
- Login: page + error handling
- NavBar w/ fancy dark mode switch
- authentication JWT stored in a cryptographically signed cookie for security reasons (no need to store user info in context thanks to the me query which can tell us the info knowing the cookie)
- automatic login when registering correctly
- logout
- Set up server-side rendering w/ Next.js & urql (can choose which pages to render server-side)
- link to home
- Added services & postes to register
- Fixed bugs

## Fixed

- homepage loads faster than the cookie so the user has to refresh to see he is well logged in: was actually caused by urql document caching. Fixed by implementing update cache policies for login and register mutations with @urql/exchange-graphcache.
- fixed looks

## [v0.0.2](https://github.com/benzinho75/JEECE-collab/compare/v0.0.1...v0.0.2) - 2021-02-28

### Added

- Switched to TypeORM and described the schema => generating the postgres DB in sync mode for the moment
- Set up Express and GraphQL w/ Apollo and type-grapql
- Exposed Service and Poste entities to the GraphQL schema and made the corresponding resolvers w/ CRUD operations
- Exposed User to the graphql schema with register and login mutations
- password hashing with argon2
- email and password testing when registering
- proper error messages

## [v0.0.1](https://github.com/benzinho75/JEECE-collab/releases/tag/v0.0.1) - 2021-02-19

### Added

- Initialized server with Node.js and TypeScript
- Set up MikroORM w/ PostgreSQL
