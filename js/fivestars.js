/**
 * @file
 * Attaches fivestar rating.
 */

(function ($, Drupal) {
  Drupal.behaviors.fiveStarRating = {
    attach: function (context, settings) {
     $('body').find('.fivestar').each(function () {
      var $this = $(this);
      var $select = $this.find('select');
      var value = $select.data('default-value');
      var isPreview = $select.data('is-edit');
      if (!value) {
        value = -1;
      }
      var options = {
        theme: ($select.data('style') == 'default') ? 'css-stars' : $select.data('style'),
        initialRating: value,
        allowEmpty: true,
        emptyValue: '',
        readonly: ($select.attr('disabled')) ? true : false,
        onSelect: function (value, text) {
          if (isPreview) {
            return;
          }
          $this.find('select').barrating('readonly', true);
          $this.find('input[data-drupal-selector="edit-submit"]').trigger('click');
          $this.find('a').addClass('disabled');
        }
      };
      $this.find('select').once('processed').barrating('show', options);
      $this.find('input[data-drupal-selector="edit-submit"]').hide();
    });
    }
  };
})(jQuery, Drupal);
