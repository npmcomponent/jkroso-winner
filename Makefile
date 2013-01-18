EXPORT=winner
REPORTER=spec
MOCHA=./node_modules/.bin/mocha test/*.test.js

all: Readme.md test

install: components

dist/winner.min.js: src/index.js
	@mkdir dist
	@./node_modules/.bin/bigfile\
		--entry=src/index.js\
		--write=dist/winner.min.js
		-p -x $(EXPORT)

components:
	@component install -d

test:
	@$(MOCHA) -R $(REPORTER)

debug:
	@$(MOCHA) debug

inspect:
	@$(MOCHA) --debug-brk

test/built.js: test/*.test.js src/*
	@node_modules/.bin/bigfile --entry=test/browser.js --write=test/built.js -lb

clean:
	@rm -rf dist test/built.js components build

Readme.md: src/index.js docs/head.md docs/tail.md
	@cat docs/head.md > Readme.md
	@cat src/index.js | dox -a | sed s/^\#\#/\#\#\#/ >> Readme.md
	@node_modules/.bin/mocha -R markdown test/index.test.js >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all build test clean install
