module.exports = function (importFresh) {
    return {
        zh: importFresh('./zh.json'),
        en: importFresh('./en.json')
    }
}