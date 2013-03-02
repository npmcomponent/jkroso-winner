REPORTER=spec

all: Readme.md test test/built.js

test:
	@node_modules/.bin/mocha \
		-R $(REPORTER) \
		test/*.test.js

test/built.js: src/* test/*
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish,javascript \
		| node_modules/.bin/bigfile \
		 	--export null \
		 	--plugins nodeish,javascript > test/built.js

Readme.md: src/index.js docs/head.md docs/tail.md
	@cat docs/head.md > Readme.md
	@cat src/index.js | dox -a >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all test
