var H5P = H5P || {};
 
H5P.ModelViewer = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    // Extend defaults with provided options
    this.options = $.extend(true, {}, {
      modelDescription: 'Hello world!',
      modelFile: null
    }, options);
    // Keep provided id.
    this.id = id;
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    // Set class on container to identify it as a model viewer
    // container.  Allows for styling later.
    $container.addClass("h5p-modelviewer");
    // Add model if provided.
    if (this.options.file && this.options.image.path) {
      $container.append('<div class="modelviewer-file" data-filepath="' + H5P.getPath(this.options.file.path, this.id) + '"></div>');
    }
    // Add model description.
    $container.append('<p class="modelviewer-description">' + this.options.modelDescription + '</p>');
  };
 
  return C;
})(H5P.jQuery);