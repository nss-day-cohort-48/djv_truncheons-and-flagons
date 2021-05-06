#!/usr/bin/env bash

confirm() {
	echo "About to do: $1"
	read -p "Are you sure? y or [n] => " -n 1 -r
	echo
	# REPLY is the default variable for read
	if [[ $REPLY =~ ^[Yy]$ ]]; then
		eval "$1"
	fi
}

DBFILE="./api/db.json"
INITIALDB="./dev-scripts/db.json.init"

[[ -f $INITIALDB ]] || (echo "Can't find $INITIALDB" && exit 255)

confirm "cat $INITIALDB > $DBFILE"