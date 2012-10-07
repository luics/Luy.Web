NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/connect-powered-by/*.js
	dox \
		--title connect-powered-by \
		--desc "X-Powered-By header middleware for Connect" \
		$(shell find lib/connect-powered-by/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
