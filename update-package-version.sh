#!/bin/bash

PACKAGE_VERSION=$1

update_package_version(){
  arg1=$1
  npm version $arg1
}

commit_and_push_new_version() {
  git push
}

update_package_version $PACKAGE_VERSION
commit_and_push_new_version
