bump-deps:
	@pnpx npm-check-updates --deep -u

# ----------------------------------------
# Changeset commands
# ----------------------------------------
changeset.add:
	@pnpm changeset add

changeset.version:
	@pnpm changeset version

changeset.publish:
	@pnpm changeset publish

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
