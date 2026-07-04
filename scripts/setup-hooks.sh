#!/usr/bin/env bash
# Points git at the repo-tracked hooks so the secret-scanning pre-commit check
# is active for every clone that runs `npm install`.
set -eu

repo_root=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [ -z "$repo_root" ]; then
  exit 0
fi

git -C "$repo_root" config core.hooksPath scripts/git-hooks
