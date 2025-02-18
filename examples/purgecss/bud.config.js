module.exports = app =>
  app
    .template({template: 'public/index.html'})
    .entry({app: 'app.css'})
    .purgecss({
      content: [app.path('project', 'public', '*.html')],
      css: [app.path('src', '**', '*.css')],
    })
