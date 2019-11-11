module.exports = {
    '/css/': [
        '',     /* /foo/ */
        'css1',  /* /foo/one.html */
        'css2'   /* /foo/two.html */
    ],

    '/javascript/': [
        '',      /* /bar/ */
        'javascript1', /* /bar/three.html */
        'javascript2'   /* /bar/four.html */
    ],

    // fallback
    '/': [
        '',        /* / */
        '/03_about/', /* /contact.html */
        '/03_about/test'    /* /03_about.html */
    ]
}
