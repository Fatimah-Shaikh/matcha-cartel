#!/bin/bash
export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
cd "$(dirname "$0")/.."
exec npm run dev -- -p "${PORT:-3000}"
