function loadWebAssembly(filename, imports = {}) {
    imports.env = imports.env || {}
    Object.assign(imports.env, {
        tableBase: 0,
        table: new WebAssembly.Table({
            initial: 4,
            element: 'anyfunc',
        }),
        memoryBase: 0,
        abort: () => { throw new Error('overflow'); },
    });

    const fetchPromise = fetch(filename)
    return WebAssembly
        .compileStreaming(fetchPromise)
        .then(module => WebAssembly.instantiate(module, imports))
}

