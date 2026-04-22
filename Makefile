DEPS_EXCLUDE := \
	@babel/core \
	@babel/preset-env \
	@babel/runtime \
	@types/react \
	@types/react-dom \
	expo \
	expo-router \
	expo-status-bar \
	react \
	react-dom \
	react-native \
	react-native-reanimated \
	react-native-safe-area-context \
	typescript

bump-deps:
	@pnpx npm-check-updates --deep -u -x "$(DEPS_EXCLUDE)"

# ----------------------------------------
# CLI commands
# ----------------------------------------
cli:
	@pnpm exec iueev $(filter-out $@,$(MAKECMDGOALS))

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
	@pnpm dlx --allow-build=esbuild @turbo/gen pkg --args $(filter-out $@,$(MAKECMDGOALS))

turbo.dry:
	@pnpm turbo clean && git clean -xdf .turbo node_modules

%:
	@:
