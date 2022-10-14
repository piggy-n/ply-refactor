const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext
    .keys()
    .map(requireContext);

try {
    importAll(require.context('../../assets/icons/', true, /\.svg$/));
} catch (e) {
    console.error(e);
}
