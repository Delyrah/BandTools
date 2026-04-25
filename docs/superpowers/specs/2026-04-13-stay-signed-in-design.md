---
title: Stay Signed In
date: 2026-04-13
status: approved
---

## Overview

Add a "Stay signed in" checkbox to the login form. When unchecked (default), tokens are stored in `sessionStorage` and cleared when the tab is closed. When checked, tokens are stored in `localStorage` and persist across sessions.

## Architecture

`AuthService` owns the storage decision. A private `_persistSession` signal holds the flag set at login time, so all subsequent calls (refresh, logout, token reads) use the same storage target without needing the flag re-passed.

## Changes

### `auth.service.ts`
- Add private `_persistSession = signal(false)`
- `login(dto, staySignedIn: boolean)` — sets `_persistSession` before handling the response
- `handleAuthResponse()` — writes tokens to `localStorage` or `sessionStorage` based on `_persistSession()`
- `getAccessToken()` / `getRefreshToken()` — read from the active storage target
- `clearTokens()` — clears **both** storages to prevent stale tokens lingering
- `loadUserFromToken()` — checks `localStorage` first, then `sessionStorage`, sets `_persistSession` accordingly

### `login.component.ts`
- Add `staySignedIn` form control (default: `false`)
- Pass `form.value.staySignedIn` as second argument to `authService.login()`

### `login.component.html`
- Add `MatCheckbox` bound to `staySignedIn` control, labelled "Stay signed in"

## Edge Cases

- Checkbox unchecked by default — no behaviour change for users who ignore it
- `clearTokens()` clears both storages — no stale token left behind if user switches preference
- Page reload: `loadUserFromToken()` finds the token in whichever storage was used and restores `_persistSession` correctly
- `refresh()` and `logout()` inherit the storage target from `_persistSession` — no extra parameters needed
