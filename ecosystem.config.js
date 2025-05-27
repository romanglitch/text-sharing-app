module.exports = {
    apps: [
        {
            name: 'Text sharing app',
            script: 'node_modules/next/dist/bin/next',
            args: '-p 4123',
            exec_mode: 'cluster',
            instances: 'max'
        }
    ]
}