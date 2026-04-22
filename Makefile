bump-deps:
	@pnpx npm-check-updates --deep -u

# ----------------------------------------
# Turbo commands
# ----------------------------------------
turbo.boundaries:
	@pnpm turbo boundaries

turbo.pkg:
	@pnpm turbo gen pkg --args $(filter-out $@,$(MAKECMDGOALS))

turbo.dry:
	@pnpm run-s clean && git clean -xdf .turbo node_modules

%:
	@:
