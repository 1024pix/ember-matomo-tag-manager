#!/bin/bash

set -euxo pipefail

NEW_VERSION=$1

npm version "${NEW_VERSION}"
git push
git push --tags
npm publish
