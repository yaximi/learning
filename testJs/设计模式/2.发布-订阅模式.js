// 观察者
var observer = {
    subscribes: [],

    subscribe: function (type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = []
        }

        typeof fn === 'function' && this.subscribes[type].push(fn)
    },

    publish: function () {
        var type = [].shift.call(arguments),
            fns = this.subscribes[type]

        if (!fns || fns.length === 0) {
            return
        }

        for (var i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments)
        }
    },

    remove: function (type, fn) {
        if (typeof type === 'undefined') {
            this.subscribes = []
            return
        }

        var fns = this.subscribes[type]

        if (!fns || !fns.length) {
            return
        }

        if (typeof fn === 'undefined') {
            fns.length = 0
            return
        }

        for (var i = 0; i < fns.length; i++) {
            if (fns[i] === fn) {
                fns.splice(i, 1)
            }
        }
    }
}

observer.subscribe('job', function (jobs) {
    console.info('A')
})

observer.subscribe('job', function (jobs) {
    console.info('B')
})

observer.publish('job', 'H5')
