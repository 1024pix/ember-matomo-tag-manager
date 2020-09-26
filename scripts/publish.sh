#!/bin/bash

set -euxo pipefail

NEW_VERSION=$1

npm version "${NEW_VERSION}"
git push
git push --tags
npm publish

gh release create "v${NEW_VERSION}" --title "v${NEW_VERSION}" --draft
