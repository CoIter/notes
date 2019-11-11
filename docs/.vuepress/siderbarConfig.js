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
        '/about/', /* /contact.html */
        '/about/test'    /* /about.html */
    ]
}
