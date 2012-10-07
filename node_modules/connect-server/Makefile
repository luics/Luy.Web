NODE = node
TEST = ./node_modules/.bin/vows
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(TEST) $(TEST_FLAGS) $(TESTS)

docs: docs/api.html

docs/api.html: lib/connect-server/*.js
	dox \
		--title connect-server \
		--desc "Server header middleware for Connect" \
		$(shell find lib/connect-server/* -type f) > $@

docclean:
	rm -f docs/*.{1,html}

.PHONY: test docs docclean
