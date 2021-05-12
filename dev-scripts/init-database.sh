#!/usr/bin/env bash

# =====================================> VARS
DBFILE="./api/db.json"
INITIALDB="./dev-scripts/db.json.init"


# =====================================> FUNC
confirm() {
	echo "About to do: $1"
	read -p "Are you sure? y or [n] => " -n 1 -r
	echo
	# REPLY is the default variable for read
	if [[ $REPLY =~ ^[Yy]$ ]]; then
		eval "$1"
	fi
}

# =====================================> EXEC
mkdir -p api 

[[ -f $INITIALDB ]] || (echo "Can't find $INITIALDB" && exit 255)

if [ -f $DBFILE ]; then
	confirm "cat $INITIALDB > $DBFILE"
else
	cat $INITIALDB > $DBFILE
fi

