#!/bin/bash

set -euxo pipefail

NEW_VERSION=$1

npm version "${NEW_VERSION}"
git push --tags "v${NEW_VERSION}"
npm publish --tag "v${NEW_VERSION}"
